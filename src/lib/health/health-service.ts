import { BaseHealthCheck, HealthCheckResult, HealthStatus, NewHealthStatus, PublicHealthResponse, DetailedHealthResponse, DetailedHealthCheck, KubernetesHealthResponse } from './base-health-check';
import {
  KafkaHealthCheck,
  HeraclesHealthCheck,
  PrometheusHealthCheck,
  SentryHealthCheck
} from './service-health-checks';
import { SystemHealthCheck } from './system-health-check';

export class HealthService {
  private healthChecks: BaseHealthCheck[];

  constructor() {
    this.healthChecks = [
      new SystemHealthCheck(),
      new KafkaHealthCheck(),
      new HeraclesHealthCheck(),
      new PrometheusHealthCheck(),
      new SentryHealthCheck(),
    ];
  }

  find(name: string): BaseHealthCheck | undefined {
    return this.healthChecks.find((check) => check.name() === name);
  }

  getCheckNames(): string[] {
    return this.healthChecks.map((check) => check.name());
  }

  async runAllChecks(): Promise<HealthCheckResult[]> {
    const results: HealthCheckResult[] = [];

    // Run all checks in parallel for better performance
    const checkPromises = this.healthChecks.map(async (check) => {
      try {
        return await check.check();
      } catch (error) {
        return {
          name: check.name(),
          status: HealthStatus.UNHEALTHY,
          responseTime: 0,
          message: (error as Error).message,
          metrics: {},
          displayName: check.displayName?.(),
          description: check.description?.(),
          tags: check.tags?.()
        };
      }
    });

    const checkResults = await Promise.all(checkPromises);
    results.push(...checkResults);

    return results;
  }

  async runSingleCheck(name: string): Promise<HealthCheckResult | null> {
    const check = this.find(name);
    if (!check) {
      return null;
    }

    try {
      return await check.check();
    } catch (error) {
      return {
        name: check.name(),
        status: HealthStatus.UNHEALTHY,
        responseTime: 0,
        message: (error as Error).message,
        metrics: {},
        displayName: check.displayName?.(),
        description: check.description?.(),
        tags: check.tags?.()
      };
    }
  }

  async getOverallStatus(): Promise<{ status: string; summary: Record<string, string> }> {
    const results = await this.runAllChecks();
    const summary: Record<string, string> = {};
    
    let overallHealthy = true;
    let hasWarnings = false;

    results.forEach((result) => {
      summary[result.name] = result.status;
      if (result.status === HealthStatus.UNHEALTHY) {
        overallHealthy = false;
      } else if (result.status === HealthStatus.WARNING) {
        hasWarnings = true;
      }
    });

    const status = overallHealthy 
      ? (hasWarnings ? 'warning' : 'healthy')
      : 'unhealthy';

    return { status, summary };
  }

  async getMetrics(): Promise<Record<string, unknown>> {
    const results = await this.runAllChecks();
    return results.reduce(
      (metrics, result) => {
        metrics[`${result.name}_status`] = result.status;
        metrics[`${result.name}_responseTime`] = result.responseTime;
        if (result.metrics) {
          Object.entries(result.metrics).forEach(([key, value]) => {
            metrics[`${result.name}_${key}`] = value;
          });
        }
        return metrics;
      },
      {} as Record<string, unknown>
    );
  }

  // New three-tier health check methods
  
  async getPublicHealth(): Promise<PublicHealthResponse> {
    const startTime = Date.now();
    
    try {
      // For public health, only check system resources (fast check)
      const status = await this.checkBasicHealth();
      
      const responseTime = Date.now() - startTime;
      
      return {
        status,
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version || '0.1.0',
        responseTime
      };
      
    } catch {
      const responseTime = Date.now() - startTime;
      
      return {
        status: NewHealthStatus.UNHEALTHY,
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version || '0.1.0',
        responseTime
      };
    }
  }
  
  async getDetailedHealth(): Promise<DetailedHealthResponse> {
    const startTime = Date.now();
    
    try {
      const results = await this.runAllChecks();
      
      // Transform to new format
      const detailedChecks: DetailedHealthCheck[] = [];
      let overallStatus = NewHealthStatus.HEALTHY;
      const currentStatuses: Record<string, NewHealthStatus> = {};
      
      for (const result of results) {
        const detailedCheck = this.transformToDetailedCheck(result);
        detailedChecks.push(detailedCheck);
        currentStatuses[result.name] = detailedCheck.status;
        
        // Determine overall status (worst case wins)
        if (detailedCheck.status === NewHealthStatus.UNHEALTHY) {
          overallStatus = NewHealthStatus.UNHEALTHY;
        } else if (detailedCheck.status === NewHealthStatus.DEGRADED && overallStatus !== NewHealthStatus.UNHEALTHY) {
          overallStatus = NewHealthStatus.DEGRADED;
        }
      }
      
      // Check if status changed significantly and invalidate cache if needed
      await this.handleCacheInvalidation(currentStatuses, overallStatus);
      
      const responseTime = Date.now() - startTime;
      
      return {
        overall: overallStatus,
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version || '0.1.0',
        responseTime,
        checks: detailedChecks
      };
      
    } catch {
      const responseTime = Date.now() - startTime;
      
      return {
        overall: NewHealthStatus.UNHEALTHY,
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version || '0.1.0',
        responseTime,
        checks: []
      };
    }
  }
  
  async getLivenessProbe(): Promise<KubernetesHealthResponse> {
    const startTime = Date.now();
    
    try {
      // Basic process alive check
      const status = await this.checkBasicHealth();
      const responseTime = Date.now() - startTime;
      
      return {
        status: status === NewHealthStatus.DEGRADED ? NewHealthStatus.HEALTHY : status, // Don't fail liveness on degraded
        timestamp: new Date().toISOString(),
        responseTime,
        message: status === NewHealthStatus.HEALTHY ? 'Liveness check completed' : 'Service has issues but is alive'
      };
      
    } catch (error) {
      const responseTime = Date.now() - startTime;
      
      return {
        status: NewHealthStatus.UNHEALTHY,
        timestamp: new Date().toISOString(),
        responseTime,
        message: `Liveness check failed: ${(error as Error).message}`
      };
    }
  }
  
  async getReadinessProbe(): Promise<KubernetesHealthResponse> {
    const startTime = Date.now();
    
    try {
      // Check critical external dependencies for readiness
      const criticalServices = ['kafka', 'heracles']; // Core services needed to be ready
      const status = await this.checkReadinessDependencies(criticalServices);
      
      const responseTime = Date.now() - startTime;
      const message = status === NewHealthStatus.HEALTHY ? 'Service ready' : 'Dependencies not available';
      
      return {
        status,
        timestamp: new Date().toISOString(),
        responseTime,
        message
      };
      
    } catch (error) {
      const responseTime = Date.now() - startTime;
      
      return {
        status: NewHealthStatus.UNHEALTHY,
        timestamp: new Date().toISOString(),
        responseTime,
        message: `Readiness check failed: ${(error as Error).message}`
      };
    }
  }
  
  // Helper methods for new functionality
  
  private async checkBasicHealth(): Promise<NewHealthStatus> {
    try {
      const systemCheck = this.healthChecks.find(check => check.name() === 'system');
      if (!systemCheck) {
        return NewHealthStatus.HEALTHY; // If no system check, assume healthy
      }
      
      const result = await systemCheck.check();
      return this.mapHealthStatus(result.status);
      
    } catch {
      return NewHealthStatus.UNHEALTHY;
    }
  }
  
  private async checkReadinessDependencies(criticalServices: string[]): Promise<NewHealthStatus> {
    try {
      const criticalChecks = this.healthChecks.filter(check => 
        criticalServices.includes(check.name())
      );
      
      const results = await Promise.all(
        criticalChecks.map(check => check.check())
      );
      
      // If any critical service is unhealthy, we're not ready
      const hasUnhealthy = results.some(result => result.status === HealthStatus.UNHEALTHY);
      if (hasUnhealthy) {
        return NewHealthStatus.UNHEALTHY;
      }
      
      const hasWarnings = results.some(result => result.status === HealthStatus.WARNING);
      if (hasWarnings) {
        return NewHealthStatus.DEGRADED;
      }
      
      return NewHealthStatus.HEALTHY;
      
    } catch {
      return NewHealthStatus.UNHEALTHY;
    }
  }
  
  private transformToDetailedCheck(result: HealthCheckResult): DetailedHealthCheck {
    return {
      name: result.name,
      status: this.mapHealthStatus(result.status),
      responseTime: result.responseTime,
      metrics: this.formatMetrics(result.name, result.metrics),
      error: result.message && result.status !== HealthStatus.HEALTHY ? result.message : undefined
    };
  }
  
  private mapHealthStatus(oldStatus: HealthStatus): NewHealthStatus {
    const statusMapping = {
      [HealthStatus.HEALTHY]: NewHealthStatus.HEALTHY,
      [HealthStatus.WARNING]: NewHealthStatus.DEGRADED,
      [HealthStatus.UNHEALTHY]: NewHealthStatus.UNHEALTHY
    };
    
    return statusMapping[oldStatus] || NewHealthStatus.UNHEALTHY;
  }
  
  private formatMetrics(checkName: string, metrics?: Record<string, unknown>): Record<string, unknown> | undefined {
    if (!metrics) return undefined;
    
    // Format metrics based on check type for consistent API response
    if (checkName === 'system') {
      return this.formatSystemMetrics(metrics);
    }
    
    // Return as-is for other check types
    return metrics;
  }
  
  private formatSystemMetrics(metrics: Record<string, unknown>): Record<string, unknown> {
    const formatted: Record<string, unknown> = {};
    
    if (metrics.memory && typeof metrics.memory === 'object' && metrics.memory !== null) {
      const memory = metrics.memory as Record<string, unknown>;
      formatted.memory = {
        used: memory.used,
        total: memory.total,
        usagePercent: memory.usagePercent
      };
    }
    
    if (metrics.cpu && typeof metrics.cpu === 'object' && metrics.cpu !== null) {
      const cpu = metrics.cpu as Record<string, unknown>;
      formatted.cpu = {
        usagePercent: cpu.usagePercent
      };
    }
    
    if (metrics.uptime !== undefined) {
      formatted.uptime = metrics.uptime;
    }
    
    return formatted;
  }

  // Cache invalidation logic
  private lastKnownStatuses: Record<string, NewHealthStatus> = {};
  private lastOverallStatus: NewHealthStatus = NewHealthStatus.HEALTHY;

  private async handleCacheInvalidation(
    currentStatuses: Record<string, NewHealthStatus>,
    currentOverallStatus: NewHealthStatus
  ): Promise<void> {
    try {
      let shouldInvalidate = false;
      
      // Check if overall status changed
      if (this.lastOverallStatus !== currentOverallStatus) {
        console.info(`Overall health status changed: ${this.lastOverallStatus} -> ${currentOverallStatus}`);
        shouldInvalidate = true;
        this.lastOverallStatus = currentOverallStatus;
      }
      
      // Check if any individual service status changed significantly
      for (const [serviceName, currentStatus] of Object.entries(currentStatuses)) {
        const lastStatus = this.lastKnownStatuses[serviceName];
        
        if (lastStatus && lastStatus !== currentStatus) {
          console.info(`Service ${serviceName} status changed: ${lastStatus} -> ${currentStatus}`);
          shouldInvalidate = true;
        }
        
        this.lastKnownStatuses[serviceName] = currentStatus;
      }
      
      // Invalidate cache if significant changes detected
      if (shouldInvalidate) {
        const { getHealthCache } = await import('./cache');
        const cache = getHealthCache();
        
        await cache.invalidate('snapmyfine:health:*');
        console.info('Health check cache invalidated due to status changes');
      }
      
    } catch (error) {
      console.warn('Cache invalidation error:', error);
    }
  }
}