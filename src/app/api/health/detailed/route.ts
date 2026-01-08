import { NextRequest, NextResponse } from 'next/server';
import { HealthService, ipValidator } from '../../../../lib/health';
import { getHealthCache } from '../../../../lib/health/cache';
import { getResponseCompressor } from '../../../../lib/health/compression';
import { recordHealthMetric } from '../../../../lib/health/metrics';
import { logHealthCheckRequest, logSecurityEvent } from '../../../../lib/health/structured-logger';
import { withRateLimit } from '../../../../lib/health/security-middleware';

const healthService = new HealthService();
const cache = getHealthCache();

async function handleDetailedHealthCheck(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();
  
  // Check if this is a CLI request - bypass IP validation for CLI
  const userAgent = request.headers.get('user-agent') || '';
  const isCLIRequest = userAgent.includes('SnapMyFine-Health-Check');
  
  // Get clientIP for logging (works for both CLI and web requests)  
  let clientIP = 'unknown';
  
  // Validate access first (skip IP validation for CLI)
  if (!isCLIRequest) {
    const validation = ipValidator.validateAccess(request);
    clientIP = validation.clientIP;
    
    if (!validation.allowed) {
      ipValidator.logAccess(request, false, validation.reason);
      
      // Log security event with structured logging
      logSecurityEvent(
        'access_denied',
        validation.clientIP,
        '/api/health/detailed',
        { reason: validation.reason },
        request.headers.get('user-agent') || undefined
      );
      
      return NextResponse.json(
        {
          error: 'Access denied',
          message: 'IP not whitelisted or invalid API key',
          clientIP: validation.clientIP,
          timestamp: new Date().toISOString()
        },
        { status: 403 }
      );
    }
    
    // Log successful access for non-CLI requests
    ipValidator.logAccess(request, true);
  } else {
    clientIP = 'CLI';
  }
  
  try {
    // Check Redis cache first
    const cacheKey = cache.getDetailedCacheKey();
    const cachedResult = await cache.get(cacheKey);
    
    if (cachedResult && typeof cachedResult === 'object' && cachedResult !== null && 'checks' in cachedResult) {
      const responseTime = Date.now() - startTime;
      
      // Record metrics for cached detailed result
      const result = cachedResult as { checks?: Array<{ name: string; status: string }>; overall: string };
      const checksMap = result.checks?.reduce((acc: Record<string, string>, check: { name: string; status: string }) => {
        acc[check.name] = check.status;
        return acc;
      }, {}) || {};
      
      recordHealthMetric(
        '/health/detailed',
        responseTime,
        result.overall === 'Healthy' ? 'Healthy' : 'Unhealthy',
        true,
        { ip: clientIP, headers: request.headers },
        checksMap
      );
      
      // Log structured data for cached detailed result
      logHealthCheckRequest(
        '/api/health/detailed',
        clientIP,
        result.overall as 'Healthy' | 'Unhealthy' | 'Degraded',
        responseTime,
        checksMap,
        {
          userAgent: request.headers.get('user-agent') || undefined,
          statusCode: 200,
          cacheHit: true,
          authenticationType: isCLIRequest ? 'cli' : 'ip_whitelist'
        }
      );
      
      // Use compression for cached detailed response
      const compressor = getResponseCompressor();
      return await compressor.compressResponse(request, result, {
        'Cache-Control': 'private, max-age=60',
        'X-Cache': 'HIT'
      });
    }

    // Get fresh data
    const result = await healthService.getDetailedHealth();
    
    // Cache the result in Redis
    await cache.set(cacheKey, result, 'detailed');

    const responseTime = Date.now() - startTime;
    
    // Record metrics for fresh detailed result
    const checksMap = result.checks.reduce((acc: Record<string, string>, check) => {
      acc[check.name] = check.status;
      return acc;
    }, {});
    
    recordHealthMetric(
      '/health/detailed',
      responseTime,
      result.overall === 'Healthy' ? 'Healthy' : 'Unhealthy',
      false,
      { ip: clientIP, headers: request.headers },
      checksMap
    );

    // Log structured data for fresh detailed result
    logHealthCheckRequest(
      '/api/health/detailed',
      clientIP,
      result.overall,
      responseTime,
      checksMap,
      {
        userAgent: request.headers.get('user-agent') || undefined,
        statusCode: 200,
        cacheHit: false,
        authenticationType: isCLIRequest ? 'cli' : 'ip_whitelist'
      }
    );
    
    // Use compression for fresh detailed response
    const compressor = getResponseCompressor();
    return await compressor.compressResponse(request, result, {
      'Cache-Control': 'private, max-age=60',
      'X-Cache': 'MISS'
    });
    
  } catch (error) {
    console.error(`Detailed health check failed for ${clientIP}:`, error);
    
    const responseTime = Date.now() - startTime;
    
    // Record error metrics
    recordHealthMetric(
      '/health/detailed',
      responseTime,
      'Unhealthy',
      false,
      { ip: clientIP, headers: request.headers }
    );
    
    return NextResponse.json(
      {
        overall: 'Unhealthy',
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version || '0.1.0',
        responseTime: responseTime,
        checks: [],
        error: 'Internal health check error'
      },
      { status: 500 }
    );
  }
}

// Apply rate limiting to detailed endpoint
export const GET = withRateLimit('detailed')(handleDetailedHealthCheck);