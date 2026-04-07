import { NextRequest } from 'next/server';

interface IPValidationResult {
  allowed: boolean;
  clientIP: string;
  reason?: string;
}

export class IPWhitelistValidator {
  private allowedNetworks: string[];
  private allowedIPs: string[];
  private apiKeys: Set<string>;

  constructor() {
    // Parse IP whitelist from environment
    const ipWhitelist = process.env.HEALTH_DETAILED_ALLOWED_IPS || 
      '10.0.0.0/8,172.16.0.0/12,192.168.0.0/16,127.0.0.0/8';
    
    this.allowedNetworks = [];
    this.allowedIPs = [];
    
    ipWhitelist.split(',').forEach(entry => {
      const trimmed = entry.trim();
      if (trimmed.includes('/')) {
        this.allowedNetworks.push(trimmed);
      } else {
        this.allowedIPs.push(trimmed);
      }
    });

    // Parse API keys from environment
    const apiKeys = process.env.HEALTH_DETAILED_API_KEYS || '';
    this.apiKeys = new Set(apiKeys.split(',').map(key => key.trim()).filter(key => key.length > 0));

    console.info(`Health check security initialized: ${this.allowedNetworks.length} networks, ${this.allowedIPs.length} IPs, ${this.apiKeys.size} API keys`);
  }

  validateAccess(request: NextRequest): IPValidationResult {
    const clientIP = this.extractClientIP(request);
    
    // First check API key authentication
    const apiKey = request.headers.get('x-api-key');
    if (apiKey && this.apiKeys.has(apiKey)) {
      return {
        allowed: true,
        clientIP,
        reason: 'Valid API key provided'
      };
    }

    // Then check IP whitelist
    if (this.isIPAllowed(clientIP)) {
      return {
        allowed: true,
        clientIP,
        reason: 'IP address is whitelisted'
      };
    }

    return {
      allowed: false,
      clientIP,
      reason: apiKey ? 'Invalid API key and IP not whitelisted' : 'IP not whitelisted and no API key provided'
    };
  }

  private extractClientIP(request: NextRequest): string {
    // Check various headers for the real client IP
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');
    const remoteAddress = request.headers.get('x-remote-address');
    
    if (forwardedFor) {
      // X-Forwarded-For can contain multiple IPs, use the first one
      return forwardedFor.split(',')[0].trim();
    }
    
    if (realIP) {
      return realIP;
    }
    
    if (remoteAddress) {
      return remoteAddress;
    }

    // Fallback to connection remote address (less reliable in proxied environments)
    return 'unknown';
  }

  private isIPAllowed(ip: string): boolean {
    // Check exact IP matches
    if (this.allowedIPs.includes(ip)) {
      return true;
    }

    // Check network ranges
    return this.allowedNetworks.some(network => this.isIPInNetwork(ip, network));
  }

  private isIPInNetwork(ip: string, network: string): boolean {
    try {
      const [networkIP, prefixLength] = network.split('/');
      const prefix = parseInt(prefixLength, 10);
      
      // Convert IPs to integers for comparison
      const ipInt = this.ipToInt(ip);
      const networkInt = this.ipToInt(networkIP);
      
      // Calculate network mask
      const mask = (0xFFFFFFFF << (32 - prefix)) >>> 0;
      
      // Check if IP is in network
      return (ipInt & mask) === (networkInt & mask);
    } catch (error) {
      console.warn(`Error checking IP ${ip} against network ${network}:`, error);
      return false;
    }
  }

  private ipToInt(ip: string): number {
    return ip.split('.').reduce((acc, octet) => {
      return (acc << 8) + parseInt(octet, 10);
    }, 0) >>> 0; // Convert to unsigned 32-bit integer
  }

  logAccess(request: NextRequest, allowed: boolean, reason?: string): void {
    const clientIP = this.extractClientIP(request);
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    console.log(JSON.stringify({
      timestamp: new Date().toISOString(),
      level: allowed ? 'INFO' : 'WARN',
      category: 'health_security',
      event: 'access_validation',
      client_ip: clientIP,
      user_agent: userAgent,
      allowed,
      reason: reason || (allowed ? 'Access granted' : 'Access denied'),
      service: 'snapmyfine'
    }));
  }

  // Method to validate API key separately
  isValidApiKey(apiKey: string): boolean {
    return this.apiKeys.has(apiKey);
  }

  // Method to get allowed networks for debugging
  getAllowedNetworks(): string[] {
    return [...this.allowedNetworks];
  }

  // Method to get allowed IPs for debugging
  getAllowedIPs(): string[] {
    return [...this.allowedIPs];
  }
}

// Singleton instance
let validatorInstance: IPWhitelistValidator | null = null;

export const ipValidator = {
  validateAccess: (request: NextRequest): IPValidationResult => {
    if (!validatorInstance) {
      validatorInstance = new IPWhitelistValidator();
    }
    return validatorInstance.validateAccess(request);
  },

  logAccess: (request: NextRequest, allowed: boolean, reason?: string): void => {
    if (!validatorInstance) {
      validatorInstance = new IPWhitelistValidator();
    }
    validatorInstance.logAccess(request, allowed, reason);
  },

  isValidApiKey: (apiKey: string): boolean => {
    if (!validatorInstance) {
      validatorInstance = new IPWhitelistValidator();
    }
    return validatorInstance.isValidApiKey(apiKey);
  }
};