import { NextRequest, NextResponse } from 'next/server';
import { logHealthCheckError } from './structured-logger';

// Security middleware to wrap health check endpoints
export function withHealthSecurity<T extends unknown[]>(
  handler: (request: NextRequest, ...args: T) => Promise<NextResponse>
) {
  return async (request: NextRequest, ...args: T): Promise<NextResponse> => {
    try {
      // Add security headers to all health check responses
      const response = await handler(request, ...args);
      
      // Add standard security headers
      response.headers.set('X-Content-Type-Options', 'nosniff');
      response.headers.set('X-Frame-Options', 'DENY');
      response.headers.set('X-XSS-Protection', '1; mode=block');
      response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
      response.headers.set('X-Health-Check-Security', 'enabled');
      
      // Add CORS headers for health check endpoints
      response.headers.set('Access-Control-Allow-Origin', '*');
      response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, X-API-Key');
      response.headers.set('Access-Control-Max-Age', '86400');

      return response;
      
    } catch (error) {
      // Log security-related errors
      logHealthCheckError(
        request.url,
        error as Error,
        request.headers.get('x-forwarded-for') || 'unknown',
        {
          userAgent: request.headers.get('user-agent'),
          method: request.method
        }
      );

      // Return generic error response
      return NextResponse.json(
        {
          error: 'Internal server error',
          timestamp: new Date().toISOString(),
          service: 'snapmyfine'
        },
        { 
          status: 500,
          headers: {
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'X-Health-Check-Security': 'enabled'
          }
        }
      );
    }
  };
}

// Rate limiting implementation (simple in-memory store)
class RateLimiter {
  private requests: Map<string, { count: number; resetTime: number }> = new Map();
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests: number = 60, windowMs: number = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    
    // Clean up expired entries every minute
    setInterval(() => this.cleanup(), 60000);
  }

  isAllowed(clientIP: string): boolean {
    const now = Date.now();
    const clientData = this.requests.get(clientIP);

    if (!clientData || now > clientData.resetTime) {
      // New client or window expired
      this.requests.set(clientIP, {
        count: 1,
        resetTime: now + this.windowMs
      });
      return true;
    }

    if (clientData.count >= this.maxRequests) {
      return false;
    }

    clientData.count++;
    return true;
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [clientIP, data] of this.requests.entries()) {
      if (now > data.resetTime) {
        this.requests.delete(clientIP);
      }
    }
  }

  getRemainingRequests(clientIP: string): number {
    const clientData = this.requests.get(clientIP);
    if (!clientData || Date.now() > clientData.resetTime) {
      return this.maxRequests;
    }
    return Math.max(0, this.maxRequests - clientData.count);
  }

  getResetTime(clientIP: string): number {
    const clientData = this.requests.get(clientIP);
    if (!clientData || Date.now() > clientData.resetTime) {
      return Date.now() + this.windowMs;
    }
    return clientData.resetTime;
  }
}

// Global rate limiter instances
const publicRateLimiter = new RateLimiter(60, 60000); // 60 requests per minute
const detailedRateLimiter = new RateLimiter(30, 60000); // 30 requests per minute

export function withRateLimit(endpoint: 'public' | 'detailed') {
  const limiter = endpoint === 'public' ? publicRateLimiter : detailedRateLimiter;
  
  return function<T extends unknown[]>(
    handler: (request: NextRequest, ...args: T) => Promise<NextResponse>
  ) {
    return async (request: NextRequest, ...args: T): Promise<NextResponse> => {
      const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
                      request.headers.get('x-real-ip') || 
                      'unknown';

      if (!limiter.isAllowed(clientIP)) {
        return NextResponse.json(
          {
            error: 'Rate limit exceeded',
            message: 'Too many health check requests',
            clientIP,
            timestamp: new Date().toISOString()
          },
          { 
            status: 429,
            headers: {
              'X-RateLimit-Remaining': '0',
              'X-RateLimit-Reset': Math.ceil(limiter.getResetTime(clientIP) / 1000).toString(),
              'Retry-After': '60'
            }
          }
        );
      }

      const response = await handler(request, ...args);
      
      // Add rate limit headers to response
      response.headers.set('X-RateLimit-Remaining', limiter.getRemainingRequests(clientIP).toString());
      response.headers.set('X-RateLimit-Reset', Math.ceil(limiter.getResetTime(clientIP) / 1000).toString());
      
      return response;
    };
  };
}