interface LogContext {
  overall?: string;
  [key: string]: unknown;
}

interface SecurityEventContext {
  [key: string]: unknown;
}

interface LogMetadata {
  userAgent?: string;
  statusCode?: number;
  cacheHit?: boolean;
  authenticationType?: 'none' | 'ip_whitelist' | 'api_key';
}

/**
 * Structured logging for health check requests
 */
export function logHealthCheckRequest(
  endpoint: string,
  clientIP: string,
  status: 'Healthy' | 'Unhealthy' | 'Degraded',
  responseTime: number,
  context: LogContext,
  metadata?: LogMetadata
): void {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level: 'INFO',
    category: 'health_check',
    endpoint,
    client_ip: clientIP,
    status,
    response_time_ms: responseTime,
    context,
    metadata: metadata || {},
    service: 'snapmyfine'
  };

  console.log(JSON.stringify(logEntry));
}

/**
 * Structured logging for security events
 */
export function logSecurityEvent(
  event_type: 'access_denied' | 'access_granted' | 'invalid_key',
  clientIP: string,
  endpoint: string,
  context: SecurityEventContext,
  userAgent?: string
): void {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level: event_type === 'access_denied' || event_type === 'invalid_key' ? 'WARN' : 'INFO',
    category: 'security',
    event_type,
    client_ip: clientIP,
    endpoint,
    context,
    user_agent: userAgent,
    service: 'snapmyfine'
  };

  console.log(JSON.stringify(logEntry));
}

/**
 * Structured logging for health check errors
 */
export function logHealthCheckError(
  endpoint: string,
  error: Error,
  clientIP?: string,
  context?: Record<string, unknown>
): void {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level: 'ERROR',
    category: 'health_check_error',
    endpoint,
    client_ip: clientIP,
    error: {
      message: error.message,
      name: error.name,
      stack: error.stack
    },
    context: context || {},
    service: 'snapmyfine'
  };

  console.log(JSON.stringify(logEntry));
}

/**
 * Structured logging for cache operations
 */
export function logCacheOperation(
  operation: 'hit' | 'miss' | 'set' | 'invalidate',
  key: string,
  ttl?: number
): void {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level: 'DEBUG',
    category: 'cache',
    operation,
    key,
    ttl_seconds: ttl,
    service: 'snapmyfine'
  };

  console.log(JSON.stringify(logEntry));
}

/**
 * Structured logging for service health check operations
 */
export function logServiceHealthCheck(
  serviceName: string,
  status: 'Healthy' | 'Unhealthy' | 'Warning',
  responseTime: number,
  error?: string,
  metrics?: Record<string, unknown>
): void {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level: status === 'Unhealthy' ? 'WARN' : 'INFO',
    category: 'service_health',
    service_name: serviceName,
    status,
    response_time_ms: responseTime,
    error,
    metrics: metrics || {},
    service: 'snapmyfine'
  };

  console.log(JSON.stringify(logEntry));
}