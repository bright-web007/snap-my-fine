import { NextResponse } from 'next/server';
import { KubernetesHealthResponse, NewHealthStatus } from './base-health-check';

/**
 * Kubernetes probe handler for liveness and readiness checks
 */
export class KubernetesProbeHandler {
  
  /**
   * Handle Kubernetes liveness probe
   * This should only fail if the application process is completely broken
   */
  async handleLivenessProbe(): Promise<NextResponse> {
    const startTime = Date.now();
    
    try {
      // Basic health checks for liveness
      // - Process is alive (we're executing this code)
      // - Memory is not critically exhausted
      // - Basic Node.js functionality works
      
      const memUsage = process.memoryUsage();
      
      // Check if we have basic memory available
      const heapUsedPercent = (memUsage.heapUsed / memUsage.heapTotal) * 100;
      
      const responseTime = Date.now() - startTime;
      
      const response: KubernetesHealthResponse = {
        status: NewHealthStatus.HEALTHY,
        timestamp: new Date().toISOString(),
        responseTime,
        message: 'Process is alive and responsive'
      };

      // Only fail liveness if we're in a completely broken state
      if (heapUsedPercent > 98) {
        response.status = NewHealthStatus.UNHEALTHY;
        response.message = 'Critical memory exhaustion detected';
        
        return NextResponse.json(response, { 
          status: 503,
          headers: {
            'Content-Type': 'application/json',
            'X-Probe-Type': 'liveness',
            'X-Service': 'snapmyfine'
          }
        });
      }

      return NextResponse.json(response, {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'X-Probe-Type': 'liveness',
          'X-Service': 'snapmyfine'
        }
      });
      
    } catch (error) {
      const responseTime = Date.now() - startTime;
      
      const response: KubernetesHealthResponse = {
        status: NewHealthStatus.UNHEALTHY,
        timestamp: new Date().toISOString(),
        responseTime,
        message: `Liveness check failed: ${(error as Error).message}`
      };

      return NextResponse.json(response, { 
        status: 503,
        headers: {
          'Content-Type': 'application/json',
          'X-Probe-Type': 'liveness',
          'X-Service': 'snapmyfine'
        }
      });
    }
  }

  /**
   * Handle Kubernetes readiness probe
   * This should fail if the application is not ready to serve traffic
   */
  async handleReadinessProbe(): Promise<NextResponse> {
    const startTime = Date.now();
    
    try {
      // For readiness, we need to check if the application can serve requests
      // This includes checking critical dependencies
      
      let allReady = true;
      const message = 'Service is ready to accept traffic';
      const checks: string[] = [];
      
      // Check if Kafka consumer is running (critical for Snapmyfine)
      try {
        const { consumerService } = await import('../../../scripts/kafka-consumer');
        if (consumerService) {
          const status = consumerService.getStatus();
          if (!status.isConnected) {
            allReady = false;
            checks.push('Kafka consumer not connected');
          } else {
            checks.push('Kafka consumer connected');
          }
        } else {
          // If consumer service is not initialized, that's okay for readiness
          // as long as the application can still serve other requests
          checks.push('Kafka consumer not initialized');
        }
      } catch {
        // Kafka consumer may not be available in all environments
        checks.push('Kafka consumer status unknown');
      }
      
      // Check if environment is properly configured
      const requiredEnvVars = [
        'NEXT_HERACLES_ENDPOINT',
        'PROMETHEUS_GRAPHQL_ENDPOINT'
      ];
      
      const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
      if (missingEnvVars.length > 0) {
        allReady = false;
        checks.push(`Missing env vars: ${missingEnvVars.join(', ')}`);
      } else {
        checks.push('Environment configuration complete');
      }

      const responseTime = Date.now() - startTime;
      
      const response: KubernetesHealthResponse = {
        status: allReady ? NewHealthStatus.HEALTHY : NewHealthStatus.UNHEALTHY,
        timestamp: new Date().toISOString(),
        responseTime,
        message: allReady ? message : `Not ready: ${checks.filter(c => c.includes('not') || c.includes('Missing')).join(', ')}`
      };

      return NextResponse.json(response, {
        status: allReady ? 200 : 503,
        headers: {
          'Content-Type': 'application/json',
          'X-Probe-Type': 'readiness',
          'X-Service': 'snapmyfine',
          'X-Ready-Checks': checks.join('; ')
        }
      });
      
    } catch (error) {
      const responseTime = Date.now() - startTime;
      
      const response: KubernetesHealthResponse = {
        status: NewHealthStatus.UNHEALTHY,
        timestamp: new Date().toISOString(),
        responseTime,
        message: `Readiness check failed: ${(error as Error).message}`
      };

      return NextResponse.json(response, { 
        status: 503,
        headers: {
          'Content-Type': 'application/json',
          'X-Probe-Type': 'readiness',
          'X-Service': 'snapmyfine'
        }
      });
    }
  }

  /**
   * Handle startup probe (optional, can be used for slow-starting applications)
   */
  async handleStartupProbe(): Promise<NextResponse> {
    const startTime = Date.now();
    
    try {
      // For startup probe, we check if the application has finished initializing
      // This is more comprehensive than liveness but less strict than readiness
      
      const uptime = process.uptime();
      const responseTime = Date.now() - startTime;
      
      // Consider the app started if it's been running for at least 5 seconds
      const isStarted = uptime > 5;
      
      const response: KubernetesHealthResponse = {
        status: isStarted ? NewHealthStatus.HEALTHY : NewHealthStatus.UNHEALTHY,
        timestamp: new Date().toISOString(),
        responseTime,
        message: isStarted 
          ? `Application started successfully (uptime: ${Math.round(uptime)}s)` 
          : `Application still starting (uptime: ${Math.round(uptime)}s)`
      };

      return NextResponse.json(response, {
        status: isStarted ? 200 : 503,
        headers: {
          'Content-Type': 'application/json',
          'X-Probe-Type': 'startup',
          'X-Service': 'snapmyfine'
        }
      });
      
    } catch (error) {
      const responseTime = Date.now() - startTime;
      
      const response: KubernetesHealthResponse = {
        status: NewHealthStatus.UNHEALTHY,
        timestamp: new Date().toISOString(),
        responseTime,
        message: `Startup check failed: ${(error as Error).message}`
      };

      return NextResponse.json(response, { 
        status: 503,
        headers: {
          'Content-Type': 'application/json',
          'X-Probe-Type': 'startup',
          'X-Service': 'snapmyfine'
        }
      });
    }
  }
}

// Singleton instance
let probeHandlerInstance: KubernetesProbeHandler | null = null;

export function getProbeHandler(): KubernetesProbeHandler {
  if (!probeHandlerInstance) {
    probeHandlerInstance = new KubernetesProbeHandler();
  }
  return probeHandlerInstance;
}