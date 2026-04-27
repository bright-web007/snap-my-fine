// Removed unused MetricsData interface (lint)

interface HealthMetrics {
  totalRequests: number;
  healthyRequests: number;
  unhealthyRequests: number;
  degradedRequests: number;
  cacheHitRate: number;
  averageResponseTime: number;
  lastRequestTime: number;
  uptimeStart: number;
  endpointStats: Record<string, {
    requests: number;
    healthy: number;
    unhealthy: number;
    degraded: number;
    avgResponseTime: number;
    cacheHits: number;
  }>;
}

class HealthMetricsCollector {
  private metrics: HealthMetrics;
  private recentRequests: Array<{
    timestamp: number;
    responseTime: number;
    status: string;
    endpoint: string;
    cached: boolean;
  }>;
  private readonly maxRecentRequests = 1000;

  constructor() {
    this.metrics = {
      totalRequests: 0,
      healthyRequests: 0,
      unhealthyRequests: 0,
      degradedRequests: 0,
      cacheHitRate: 0,
      averageResponseTime: 0,
      lastRequestTime: 0,
      uptimeStart: Date.now(),
      endpointStats: {}
    };
    this.recentRequests = [];
  }

  recordHealthMetric(
    endpoint: string,
    responseTime: number,
    status: 'Healthy' | 'Unhealthy' | 'Degraded',
    cached: boolean,
    clientInfo: { ip: string; headers: Headers },
    serviceChecks?: Record<string, string>
  ): void {
    const now = Date.now();
    
    // Update overall metrics
    this.metrics.totalRequests++;
    this.metrics.lastRequestTime = now;
    
    // Update status counters
    switch (status) {
      case 'Healthy':
        this.metrics.healthyRequests++;
        break;
      case 'Unhealthy':
        this.metrics.unhealthyRequests++;
        break;
      case 'Degraded':
        this.metrics.degradedRequests++;
        break;
    }

    // Update endpoint-specific stats
    if (!this.metrics.endpointStats[endpoint]) {
      this.metrics.endpointStats[endpoint] = {
        requests: 0,
        healthy: 0,
        unhealthy: 0,
        degraded: 0,
        avgResponseTime: 0,
        cacheHits: 0
      };
    }

    const endpointStats = this.metrics.endpointStats[endpoint];
    endpointStats.requests++;
    
    switch (status) {
      case 'Healthy':
        endpointStats.healthy++;
        break;
      case 'Unhealthy':
        endpointStats.unhealthy++;
        break;
      case 'Degraded':
        endpointStats.degraded++;
        break;
    }

    if (cached) {
      endpointStats.cacheHits++;
    }

    // Update average response time for endpoint
    endpointStats.avgResponseTime = 
      ((endpointStats.avgResponseTime * (endpointStats.requests - 1)) + responseTime) / endpointStats.requests;

    // Add to recent requests
    this.recentRequests.push({
      timestamp: now,
      responseTime,
      status,
      endpoint,
      cached
    });

    // Keep only recent requests
    if (this.recentRequests.length > this.maxRecentRequests) {
      this.recentRequests = this.recentRequests.slice(-this.maxRecentRequests);
    }

    // Recalculate aggregated metrics
    this.updateAggregatedMetrics();

    // Log structured metrics
    this.logMetrics(endpoint, responseTime, status, cached, clientInfo, serviceChecks);
  }

  private updateAggregatedMetrics(): void {
    // Calculate cache hit rate
    const totalCacheHits = Object.values(this.metrics.endpointStats)
      .reduce((sum, stats) => sum + stats.cacheHits, 0);
    this.metrics.cacheHitRate = this.metrics.totalRequests > 0 
      ? (totalCacheHits / this.metrics.totalRequests) * 100 
      : 0;

    // Calculate average response time from recent requests
    if (this.recentRequests.length > 0) {
      const totalResponseTime = this.recentRequests.reduce((sum, req) => sum + req.responseTime, 0);
      this.metrics.averageResponseTime = totalResponseTime / this.recentRequests.length;
    }
  }

  private logMetrics(
    endpoint: string,
    responseTime: number,
    status: string,
    cached: boolean,
    clientInfo: { ip: string; headers: Headers },
    serviceChecks?: Record<string, string>
  ): void {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level: 'INFO',
      category: 'health_metrics',
      endpoint,
      response_time_ms: responseTime,
      status,
      cached,
      client_ip: clientInfo.ip,
      user_agent: clientInfo.headers.get('user-agent') || 'unknown',
      service_checks: serviceChecks || {},
      total_requests: this.metrics.totalRequests,
      cache_hit_rate: Math.round(this.metrics.cacheHitRate * 100) / 100,
      avg_response_time: Math.round(this.metrics.averageResponseTime * 100) / 100,
      service: 'snapmyfine'
    };

    console.log(JSON.stringify(logEntry));
  }

  getMetrics(): HealthMetrics {
    return { ...this.metrics };
  }

  getRecentRequests(limit?: number): Array<{
    timestamp: number;
    responseTime: number;
    status: string;
    endpoint: string;
    cached: boolean;
  }> {
    const requests = [...this.recentRequests];
    return limit ? requests.slice(-limit) : requests;
  }

  // Get metrics in Prometheus format
  getPrometheusMetrics(): string {
    const uptime = (Date.now() - this.metrics.uptimeStart) / 1000;
    
    let prometheus = '# HELP health_check_requests_total Total number of health check requests\n';
    prometheus += '# TYPE health_check_requests_total counter\n';
    prometheus += `health_check_requests_total{service="snapmyfine"} ${this.metrics.totalRequests}\n\n`;

    prometheus += '# HELP health_check_requests_by_status Total requests by status\n';
    prometheus += '# TYPE health_check_requests_by_status counter\n';
    prometheus += `health_check_requests_by_status{service="snapmyfine",status="healthy"} ${this.metrics.healthyRequests}\n`;
    prometheus += `health_check_requests_by_status{service="snapmyfine",status="unhealthy"} ${this.metrics.unhealthyRequests}\n`;
    prometheus += `health_check_requests_by_status{service="snapmyfine",status="degraded"} ${this.metrics.degradedRequests}\n\n`;

    prometheus += '# HELP health_check_response_time_avg Average response time in milliseconds\n';
    prometheus += '# TYPE health_check_response_time_avg gauge\n';
    prometheus += `health_check_response_time_avg{service="snapmyfine"} ${Math.round(this.metrics.averageResponseTime * 100) / 100}\n\n`;

    prometheus += '# HELP health_check_cache_hit_rate Cache hit rate percentage\n';
    prometheus += '# TYPE health_check_cache_hit_rate gauge\n';
    prometheus += `health_check_cache_hit_rate{service="snapmyfine"} ${Math.round(this.metrics.cacheHitRate * 100) / 100}\n\n`;

    prometheus += '# HELP health_check_uptime_seconds Service uptime in seconds\n';
    prometheus += '# TYPE health_check_uptime_seconds gauge\n';
    prometheus += `health_check_uptime_seconds{service="snapmyfine"} ${Math.round(uptime * 100) / 100}\n\n`;

    // Endpoint-specific metrics
    for (const [endpoint, stats] of Object.entries(this.metrics.endpointStats)) {
      prometheus += `health_check_endpoint_requests_total{service="snapmyfine",endpoint="${endpoint}"} ${stats.requests}\n`;
      prometheus += `health_check_endpoint_healthy_total{service="snapmyfine",endpoint="${endpoint}"} ${stats.healthy}\n`;
      prometheus += `health_check_endpoint_unhealthy_total{service="snapmyfine",endpoint="${endpoint}"} ${stats.unhealthy}\n`;
      prometheus += `health_check_endpoint_degraded_total{service="snapmyfine",endpoint="${endpoint}"} ${stats.degraded}\n`;
      prometheus += `health_check_endpoint_avg_response_time{service="snapmyfine",endpoint="${endpoint}"} ${Math.round(stats.avgResponseTime * 100) / 100}\n`;
      prometheus += `health_check_endpoint_cache_hits_total{service="snapmyfine",endpoint="${endpoint}"} ${stats.cacheHits}\n`;
    }

    return prometheus;
  }

  // Reset metrics (useful for testing)
  reset(): void {
    this.metrics = {
      totalRequests: 0,
      healthyRequests: 0,
      unhealthyRequests: 0,
      degradedRequests: 0,
      cacheHitRate: 0,
      averageResponseTime: 0,
      lastRequestTime: 0,
      uptimeStart: Date.now(),
      endpointStats: {}
    };
    this.recentRequests = [];
  }
}

// Singleton instance
let metricsCollector: HealthMetricsCollector | null = null;

export function recordHealthMetric(
  endpoint: string,
  responseTime: number,
  status: 'Healthy' | 'Unhealthy' | 'Degraded',
  cached: boolean,
  clientInfo: { ip: string; headers: Headers },
  serviceChecks?: Record<string, string>
): void {
  if (!metricsCollector) {
    metricsCollector = new HealthMetricsCollector();
  }
  
  metricsCollector.recordHealthMetric(endpoint, responseTime, status, cached, clientInfo, serviceChecks);
}

export function getHealthMetrics(): HealthMetrics {
  if (!metricsCollector) {
    metricsCollector = new HealthMetricsCollector();
  }
  return metricsCollector.getMetrics();
}

export function getPrometheusHealthMetrics(): string {
  if (!metricsCollector) {
    metricsCollector = new HealthMetricsCollector();
  }
  return metricsCollector.getPrometheusMetrics();
}

export function getRecentHealthRequests(limit?: number) {
  if (!metricsCollector) {
    metricsCollector = new HealthMetricsCollector();
  }
  return metricsCollector.getRecentRequests(limit);
}