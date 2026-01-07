export enum HealthStatus {
  HEALTHY = 'Healthy',
  UNHEALTHY = 'Unhealthy',
  WARNING = 'Warning'
}

// New three-tier health check status enum
export enum NewHealthStatus {
  HEALTHY = 'Healthy',
  DEGRADED = 'Degraded',  
  UNHEALTHY = 'Unhealthy'
}

export interface HealthCheckResult {
  name: string;
  status: HealthStatus;
  responseTime: number;
  message?: string;
  metrics?: Record<string, unknown>;
  displayName?: string;
  description?: string;
  tags?: string[];
}

// New three-tier health check response types
export interface PublicHealthResponse {
  status: NewHealthStatus;
  timestamp: string;
  version: string;
  responseTime: number;
}

export interface DetailedHealthCheck {
  name: string;
  status: NewHealthStatus;
  responseTime: number;
  metrics?: Record<string, unknown>;
  error?: string;
}

export interface DetailedHealthResponse {
  overall: NewHealthStatus;
  timestamp: string;
  version: string;
  responseTime: number;
  checks: DetailedHealthCheck[];
}

export interface KubernetesHealthResponse {
  status: NewHealthStatus;
  timestamp: string;
  responseTime: number;
  message?: string;
}

export abstract class BaseHealthCheck {
  protected startTime: number = 0;

  abstract name(): string;
  abstract check(): Promise<HealthCheckResult>;

  displayName?(): string {
    return this.name();
  }

  description?(): string {
    return `Health check for ${this.name()}`;
  }

  tags?(): string[] {
    return [];
  }

  protected startTimer(): void {
    this.startTime = Date.now();
  }

  protected calculateResponseTime(): number {
    return Date.now() - this.startTime;
  }

  protected createResult(
    status: HealthStatus,
    responseTime: number,
    metrics?: Record<string, unknown>,
    message?: string
  ): HealthCheckResult {
    return {
      name: this.name(),
      status,
      responseTime,
      message,
      metrics,
      displayName: this.displayName?.(),
      description: this.description?.(),
      tags: this.tags?.()
    };
  }

  protected handleError(error: Error): HealthCheckResult {
    return this.createResult(
      HealthStatus.UNHEALTHY,
      this.calculateResponseTime(),
      undefined,
      error.message
    );
  }
}