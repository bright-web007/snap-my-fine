import { BaseHealthCheck, HealthStatus, HealthCheckResult } from './base-health-check';
import { getHealthHttpClient } from './http-client';

/**
 * Kafka Health Check
 * Checks Kafka broker connectivity and consumer status
 */
export class KafkaHealthCheck extends BaseHealthCheck {
  name(): string {
    return 'kafka';
  }

  displayName(): string {
    return 'Kafka Service';
  }

  description(): string {
    return 'Message queue and event streaming service';
  }

  tags(): string[] {
    return ['external', 'messaging', 'critical'];
  }

  async check(): Promise<HealthCheckResult> {
    this.startTimer();

    try {
      // Get Kafka consumer service from Snapmyfine's existing service
      const { KafkaConsumerService } = await import('../services/kafka-consumer');
      
      // Try to get existing consumer instance or create a test instance
      let consumerService: InstanceType<typeof KafkaConsumerService>;
      
      try {
        // Import the global consumer service if available
        const { consumerService: globalConsumerService } = await import('../../scripts/kafka-consumer');
        consumerService = globalConsumerService || new KafkaConsumerService();
      } catch {
        // Fallback to creating new instance for health check
        consumerService = new KafkaConsumerService();
      }

      const status = consumerService.getStatus();
      const metrics = consumerService.getMetrics();
      
      const healthMetrics: Record<string, unknown> = {
        isConnected: status.isConnected,
        isConsuming: status.isConsuming,
        brokers: process.env.KAFKA_BROKERS?.split(',') || ['unknown'],
        groupId: process.env.KAFKA_GROUP_ID || 'unknown',
        messagesProcessed: metrics.messagesProcessed,
        totalErrors: metrics.totalErrors,
        errorRate: metrics.errorRate,
        dlqMessageCount: metrics.dlqMessageCount,
        lastProcessedAt: status.lastProcessedAt,
        uptime: status.uptime
      };

      // Determine health status based on metrics
      let healthStatus = HealthStatus.HEALTHY;
      let message = 'Kafka consumer is running normally';

      if (!status.isConnected) {
        healthStatus = HealthStatus.UNHEALTHY;
        message = 'Kafka consumer is not connected to broker';
      } else if (!status.isConsuming) {
        healthStatus = HealthStatus.WARNING;
        message = 'Kafka consumer is connected but not consuming messages';
      } else if (metrics.errorRate > 10) {
        healthStatus = HealthStatus.WARNING;
        message = `High error rate: ${metrics.errorRate}%`;
      } else if (metrics.dlqMessageCount > 50) {
        healthStatus = HealthStatus.WARNING;
        message = `High DLQ message count: ${metrics.dlqMessageCount}`;
      }

      return this.createResult(
        healthStatus,
        this.calculateResponseTime(),
        healthMetrics,
        message
      );

    } catch (error) {
      return this.handleError(error as Error);
    }
  }
}

/**
 * Heracles Health Check
 * Checks email service health
 */
export class HeraclesHealthCheck extends BaseHealthCheck {
  name(): string {
    return 'heracles';
  }

  displayName(): string {
    return 'Heracles Service';
  }

  description(): string {
    return 'Email and notification service';
  }

  tags(): string[] {
    return ['external', 'email', 'critical'];
  }

  async check(): Promise<HealthCheckResult> {
    this.startTimer();
    const httpClient = getHealthHttpClient();

    try {
      const baseUrl = process.env.NEXT_HERACLES_ENDPOINT;
      
      if (!baseUrl) {
        return this.createResult(
          HealthStatus.UNHEALTHY,
          this.calculateResponseTime(),
          { configured: false },
          'NEXT_HERACLES_ENDPOINT environment variable not configured'
        );
      }

      // Try common health check endpoints
      const healthEndpoints = ['/health', '/health/check', '/api/health', '/status'];
      
      for (const endpoint of healthEndpoints) {
        const healthUrl = `${baseUrl}${endpoint}`;
        
        try {
          const timeout = parseInt(process.env.API_HEALTH_CHECK_TIMEOUT || '5000');
          const healthResult = await httpClient.healthCheck(healthUrl, {
            timeout,
            retries: 1
          });

          const metrics: Record<string, unknown> = {
            url: healthUrl,
            statusCode: healthResult.statusCode,
            responseTime: healthResult.responseTime,
            connected: healthResult.status === 'healthy',
            configured: true
          };

          if (healthResult.status === 'healthy') {
            return this.createResult(HealthStatus.HEALTHY, this.calculateResponseTime(), metrics);
          } else if (healthResult.statusCode && healthResult.statusCode !== 404) {
            return this.createResult(
              HealthStatus.UNHEALTHY, 
              this.calculateResponseTime(), 
              metrics, 
              healthResult.error || `HTTP ${healthResult.statusCode}`
            );
          }
        } catch (fetchError) {
          if (endpoint === healthEndpoints[healthEndpoints.length - 1]) {
            throw fetchError;
          }
        }
      }

      return this.createResult(
        HealthStatus.WARNING,
        this.calculateResponseTime(),
        { url: baseUrl, configured: true },
        'No health endpoint found'
      );

    } catch (error) {
      return this.handleError(error as Error);
    }
  }
}

/**
 * Prometheus Health Check
 * Checks analytics GraphQL endpoint
 */
export class PrometheusHealthCheck extends BaseHealthCheck {
  name(): string {
    return 'prometheus';
  }

  displayName(): string {
    return 'Prometheus Service';
  }

  description(): string {
    return 'Analytics and data processing service';
  }

  tags(): string[] {
    return ['external', 'analytics', 'critical'];
  }

  async check(): Promise<HealthCheckResult> {
    this.startTimer();
    const httpClient = getHealthHttpClient();

    try {
      const graphqlEndpoint = process.env.PROMETHEUS_GRAPHQL_ENDPOINT;
      
      if (!graphqlEndpoint) {
        return this.createResult(
          HealthStatus.UNHEALTHY,
          this.calculateResponseTime(),
          { configured: false },
          'PROMETHEUS_GRAPHQL_ENDPOINT environment variable not configured'
        );
      }

      // For GraphQL endpoints, we'll check if the endpoint is accessible
      // by sending a simple introspection query or just checking the HTTP status
      const baseUrl = graphqlEndpoint.replace('/graphql', '');
      
      // Try health endpoints first
      const healthEndpoints = ['/health', '/health/check', '/api/health', '/status'];
      let healthCheckWorked = false;
      
      for (const endpoint of healthEndpoints) {
        const healthUrl = `${baseUrl}${endpoint}`;
        
        try {
          const timeout = parseInt(process.env.API_HEALTH_CHECK_TIMEOUT || '5000');
          const healthResult = await httpClient.healthCheck(healthUrl, {
            timeout,
            retries: 1
          });

          if (healthResult.statusCode !== 404) {
            const metrics: Record<string, unknown> = {
              url: healthUrl,
              statusCode: healthResult.statusCode,
              responseTime: healthResult.responseTime,
              connected: healthResult.status === 'healthy',
              configured: true,
              graphqlEndpoint: graphqlEndpoint
            };

            healthCheckWorked = true;
            
            if (healthResult.status === 'healthy') {
              return this.createResult(HealthStatus.HEALTHY, this.calculateResponseTime(), metrics);
            } else {
              return this.createResult(
                HealthStatus.UNHEALTHY, 
                this.calculateResponseTime(), 
                metrics, 
                healthResult.error || `HTTP ${healthResult.statusCode}`
              );
            }
          }
        } catch {
          // Continue to next endpoint
        }
      }

      // If no health endpoints work, check the GraphQL endpoint directly
      if (!healthCheckWorked) {
        try {
          const timeout = parseInt(process.env.API_HEALTH_CHECK_TIMEOUT || '5000');
          const response = await httpClient.get(graphqlEndpoint, { timeout, retries: 1 });
          
          const metrics: Record<string, unknown> = {
            url: graphqlEndpoint,
            statusCode: response.status,
            responseTime: this.calculateResponseTime(),
            connected: response.status === 200 || response.status === 400, // 400 is expected for GET on GraphQL
            configured: true
          };

          // GraphQL endpoints typically return 400 for GET requests, which is normal
          if (response.status === 200 || response.status === 400) {
            return this.createResult(HealthStatus.HEALTHY, this.calculateResponseTime(), metrics);
          } else {
            return this.createResult(
              HealthStatus.UNHEALTHY,
              this.calculateResponseTime(),
              metrics,
              `GraphQL endpoint returned ${response.status}`
            );
          }
        } catch (error) {
          return this.handleError(error as Error);
        }
      }

      return this.createResult(
        HealthStatus.WARNING,
        this.calculateResponseTime(),
        { configured: true, graphqlEndpoint },
        'Unable to verify Prometheus service health'
      );

    } catch (error) {
      return this.handleError(error as Error);
    }
  }
}

/**
 * Sentry Health Check
 * Checks error tracking service
 */
export class SentryHealthCheck extends BaseHealthCheck {
  name(): string {
    return 'sentry';
  }

  displayName(): string {
    return 'Sentry Service';
  }

  description(): string {
    return 'Error tracking and monitoring service';
  }

  tags(): string[] {
    return ['external', 'monitoring', 'optional'];
  }

  async check(): Promise<HealthCheckResult> {
    this.startTimer();
    const httpClient = getHealthHttpClient();

    try {
      // Extract domain from Sentry DSN
      const dsn = process.env.SENTRY_DSN;
      if (!dsn) {
        return this.createResult(
          HealthStatus.WARNING,
          this.calculateResponseTime(),
          { configured: false },
          'Sentry DSN not configured'
        );
      }

      // Parse Sentry DSN to get the base URL
      const url = new URL(dsn);
      const healthUrl = `${url.protocol}//${url.hostname}/api/0/`;
      
      const timeout = parseInt(process.env.API_HEALTH_CHECK_TIMEOUT || '5000');
      
      const healthResult = await httpClient.healthCheck(healthUrl, {
        timeout,
        retries: 1
      });

      const metrics: Record<string, unknown> = {
        url: healthUrl,
        statusCode: healthResult.statusCode,
        responseTime: healthResult.responseTime,
        connected: healthResult.status === 'healthy',
        configured: true
      };

      if (healthResult.status === 'healthy') {
        return this.createResult(HealthStatus.HEALTHY, this.calculateResponseTime(), metrics);
      } else {
        return this.createResult(
          HealthStatus.UNHEALTHY, 
          this.calculateResponseTime(), 
          metrics, 
          healthResult.error || `HTTP ${healthResult.statusCode}`
        );
      }
    } catch (error) {
      return this.handleError(error as Error);
    }
  }
}