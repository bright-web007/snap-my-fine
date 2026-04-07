import { NextRequest, NextResponse } from 'next/server';
import { HealthService } from '../../../lib/health';
import { getHealthCache } from '../../../lib/health/cache';
import { addCompressionHeaders } from '../../../lib/health/compression';
import { recordHealthMetric } from '../../../lib/health/metrics';
import { withHealthSecurity, withRateLimit } from '../../../lib/health/security-middleware';
import { logHealthCheckRequest } from '../../../lib/health/structured-logger';

const healthService = new HealthService();
const cache = getHealthCache();

async function handleHealthCheck(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();
  
  try {
    // Check Redis cache first
    const cacheKey = cache.getPublicCacheKey();
    const cachedResult = await cache.get(cacheKey);
    
    if (cachedResult && typeof cachedResult === 'object' && cachedResult !== null && 'status' in cachedResult) {
      const responseTime = Date.now() - startTime;
      console.debug('Returning cached public health result');
      
      const result = cachedResult as { status: string };
      // Record metrics for cached result
      recordHealthMetric(
        '/health',
        responseTime,
        result.status === 'Healthy' ? 'Healthy' : 'Unhealthy',
        true,
        { ip: request.headers.get('x-forwarded-for') || 'unknown', headers: request.headers }
      );
      
      // Log structured data for cached result
      logHealthCheckRequest(
        '/api/health',
        request.headers.get('x-forwarded-for') || 'unknown',
        result.status as 'Healthy' | 'Unhealthy' | 'Degraded',
        responseTime,
        { overall: result.status },
        {
          userAgent: request.headers.get('user-agent') || undefined,
          statusCode: 200,
          cacheHit: true,
          authenticationType: 'none'
        }
      );
      
      return NextResponse.json(result, {
        headers: addCompressionHeaders({
          'Cache-Control': 'public, max-age=30',
          'X-Cache': 'HIT'
        })
      });
    }

    // Get fresh data
    const result = await healthService.getPublicHealth();
    
    // Cache the result in Redis
    await cache.set(cacheKey, result, 'public');
    
    const responseTime = Date.now() - startTime;
    
    // Record metrics for fresh result
    recordHealthMetric(
      '/health',
      responseTime,
      result.status === 'Healthy' ? 'Healthy' : 'Unhealthy',
      false,
      { ip: request.headers.get('x-forwarded-for') || 'unknown', headers: request.headers }
    );
    
    // Return 503 if unhealthy for load balancer compatibility
    const statusCode = result.status === 'Unhealthy' ? 503 : 200;
    
    // Log structured data for fresh result
    logHealthCheckRequest(
      '/api/health',
      request.headers.get('x-forwarded-for') || 'unknown',
      result.status,
      responseTime,
      { overall: result.status },
      {
        userAgent: request.headers.get('user-agent') || undefined,
        statusCode: statusCode,
        cacheHit: false,
        authenticationType: 'none'
      }
    );
    
    return NextResponse.json(result, { 
      status: statusCode,
      headers: addCompressionHeaders({
        'Cache-Control': 'public, max-age=30',
        'X-Cache': 'MISS'
      })
    });
    
  } catch (error) {
    console.error('Public health check failed:', error);
    
    const responseTime = Date.now() - startTime;
    
    // Record error metrics
    recordHealthMetric(
      '/health',
      responseTime,
      'Unhealthy',
      false,
      { ip: request.headers.get('x-forwarded-for') || 'unknown', headers: request.headers }
    );
    
    const errorResponse = {
      status: 'Unhealthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '0.1.0',
      responseTime: responseTime
    };
    
    return NextResponse.json(errorResponse, { 
      status: 503,
      headers: addCompressionHeaders()
    });
  }
}

// Apply security middleware and rate limiting
export const GET = withHealthSecurity(withRateLimit('public')(handleHealthCheck));