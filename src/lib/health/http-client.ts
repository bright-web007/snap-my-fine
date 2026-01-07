/**
 * Enhanced HTTP client with connection pooling and timeout controls
 * for health check operations
 */

import { Agent as HttpAgent } from 'http';
import { Agent as HttpsAgent } from 'https';

export interface HttpClientOptions {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  keepAlive?: boolean;
  maxSockets?: number;
}

export interface HttpResponse {
  status: number;
  statusText: string;
  ok: boolean;
  json: () => Promise<unknown>;
  text: () => Promise<string>;
  headers: Record<string, string>;
}

export class HealthHttpClient {
  private httpAgent: HttpAgent;
  private httpsAgent: HttpsAgent;
  private defaultOptions: Required<HttpClientOptions>;

  constructor(options: HttpClientOptions = {}) {
    this.defaultOptions = {
      timeout: options.timeout || 5000,
      retries: options.retries || 2,
      retryDelay: options.retryDelay || 1000,
      keepAlive: options.keepAlive !== false,
      maxSockets: options.maxSockets || 5
    };

    // Create connection pools for HTTP and HTTPS
    this.httpAgent = new HttpAgent({
      keepAlive: this.defaultOptions.keepAlive,
      maxSockets: this.defaultOptions.maxSockets,
      timeout: this.defaultOptions.timeout
    });

    this.httpsAgent = new HttpsAgent({
      keepAlive: this.defaultOptions.keepAlive,
      maxSockets: this.defaultOptions.maxSockets,
      timeout: this.defaultOptions.timeout,
      rejectUnauthorized: false // For self-signed certificates in dev
    });
  }

  async get(url: string, options: Partial<HttpClientOptions> = {}): Promise<HttpResponse> {
    const finalOptions = { ...this.defaultOptions, ...options };
    
    return this.executeWithRetry(async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), finalOptions.timeout);

      try {
        const isHttps = url.startsWith('https:');
        const agent = isHttps ? this.httpsAgent : this.httpAgent;

        const response = await fetch(url, {
          method: 'GET',
          signal: controller.signal,
          // @ts-expect-error - Node.js fetch supports agent
          agent: agent,
          headers: {
            'User-Agent': 'SnapMyFine-Health-Check/1.0',
            'Accept': 'application/json, text/plain, */*',
            'Connection': 'keep-alive'
          }
        });

        clearTimeout(timeoutId);

        // Convert fetch Response to our HttpResponse interface
        const headers: Record<string, string> = {};
        response.headers.forEach((value, key) => {
          headers[key] = value;
        });

        return {
          status: response.status,
          statusText: response.statusText,
          ok: response.ok,
          headers,
          json: async () => response.json(),
          text: async () => response.text()
        };
      } catch (error) {
        clearTimeout(timeoutId);
        throw error;
      }
    }, finalOptions.retries, finalOptions.retryDelay);
  }

  private async executeWithRetry<T>(
    operation: () => Promise<T>, 
    retries: number, 
    delay: number
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        
        if (attempt === retries) {
          throw lastError;
        }

        // Check if error is worth retrying
        if (!this.isRetryableError(lastError)) {
          throw lastError;
        }

        // Wait before retry with exponential backoff
        const backoffDelay = delay * Math.pow(1.5, attempt);
        await new Promise(resolve => setTimeout(resolve, backoffDelay));
      }
    }

    throw lastError!;
  }

  private isRetryableError(error: Error): boolean {
    // Retry on network errors, timeouts, and 5xx status codes
    const retryableErrors = [
      'ECONNRESET',
      'ECONNREFUSED', 
      'ETIMEDOUT',
      'ENOTFOUND',
      'AbortError'
    ];

    return retryableErrors.some(code => 
      error.name === code || 
      error.message.includes(code) ||
      error.name === 'AbortError' // Timeout
    );
  }

  async healthCheck(url: string, options: Partial<HttpClientOptions> = {}): Promise<{
    status: 'healthy' | 'unhealthy' | 'warning';
    responseTime: number;
    statusCode?: number;
    error?: string;
    metrics?: Record<string, unknown>;
  }> {
    const startTime = Date.now();
    
    try {
      const response = await this.get(url, options);
      const responseTime = Date.now() - startTime;

      const metrics: Record<string, unknown> = {
        url,
        statusCode: response.status,
        responseTime,
        headers: response.headers
      };

      // Try to parse health data if available
      if (response.ok && response.headers['content-type']?.includes('application/json')) {
        try {
          const healthData = await response.json();
          metrics.healthData = healthData;
        } catch {
          // JSON parsing failed, ignore
        }
      }

      return {
        status: response.ok ? 'healthy' : 'unhealthy',
        responseTime,
        statusCode: response.status,
        metrics
      };

    } catch (error) {
      const responseTime = Date.now() - startTime;
      
      return {
        status: 'unhealthy',
        responseTime,
        error: (error as Error).message,
        metrics: { url, error: error }
      };
    }
  }

  /**
   * Close connection pools
   */
  destroy(): void {
    this.httpAgent.destroy();
    this.httpsAgent.destroy();
  }

  /**
   * Get connection pool statistics
   */
  getStats() {
    return {
      http: {
        sockets: this.httpAgent.sockets,
        requests: this.httpAgent.requests,
        freeSockets: this.httpAgent.freeSockets,
        maxSockets: this.httpAgent.maxSockets
      },
      https: {
        sockets: this.httpsAgent.sockets,
        requests: this.httpsAgent.requests,
        freeSockets: this.httpsAgent.freeSockets,
        maxSockets: this.httpsAgent.maxSockets
      }
    };
  }
}

// Singleton instance for reuse across health checks
let globalHealthClient: HealthHttpClient | null = null;

export function getHealthHttpClient(): HealthHttpClient {
  if (!globalHealthClient) {
    globalHealthClient = new HealthHttpClient({
      timeout: 5000,
      retries: 2,
      retryDelay: 1000,
      keepAlive: true,
      maxSockets: 10
    });
  }
  return globalHealthClient;
}

export function destroyHealthHttpClient(): void {
  if (globalHealthClient) {
    globalHealthClient.destroy();
    globalHealthClient = null;
  }
}