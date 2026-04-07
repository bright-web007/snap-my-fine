import { BaseHealthCheck, HealthCheckResult, HealthStatus } from './base-health-check';

export class SystemHealthCheck extends BaseHealthCheck {
  name(): string {
    return 'system';
  }

  displayName(): string {
    return 'System Resources';
  }

  description(): string {
    return 'Checks system resources including memory and CPU usage';
  }

  tags(): string[] {
    return ['core', 'system', 'resources'];
  }

  async check(): Promise<HealthCheckResult> {
    this.startTimer();

    try {
      const metrics = await this.getSystemMetrics();
      
      // Determine status based on thresholds
      const memoryThreshold = parseInt(process.env.MEMORY_WARNING_THRESHOLD || '80');
      const cpuThreshold = parseInt(process.env.CPU_WARNING_THRESHOLD || '70');
      const diskThreshold = parseInt(process.env.DISK_WARNING_THRESHOLD || '80');
      
      let status = HealthStatus.HEALTHY;
      let message = 'System resources within normal limits';
      
      if (metrics.memory.usagePercent > memoryThreshold || 
          metrics.cpu.usagePercent > cpuThreshold ||
          metrics.disk.usagePercent > diskThreshold) {
        status = HealthStatus.WARNING;
        message = 'System resources approaching limits';
      }
      
      const criticalMemoryThreshold = parseInt(process.env.MEMORY_CRITICAL_THRESHOLD || '95');
      const criticalCpuThreshold = parseInt(process.env.CPU_CRITICAL_THRESHOLD || '90');
      const criticalDiskThreshold = parseInt(process.env.DISK_CRITICAL_THRESHOLD || '95');
      
      if (metrics.memory.usagePercent > criticalMemoryThreshold || 
          metrics.cpu.usagePercent > criticalCpuThreshold ||
          metrics.disk.usagePercent > criticalDiskThreshold) {
        status = HealthStatus.UNHEALTHY;
        message = 'System resources critically high';
      }

      return this.createResult(
        status,
        this.calculateResponseTime(),
        metrics,
        message
      );

    } catch (error) {
      return this.handleError(error as Error);
    }
  }

  private async getSystemMetrics() {
    const memUsage = process.memoryUsage();
    const uptime = process.uptime();
    
    try {
      // Use os module for better system info
      const os = await import('os');
      const totalMemory = os.totalmem();
      const freeMemory = os.freemem();
      const usedMemory = totalMemory - freeMemory;
      const memoryUsagePercent = (usedMemory / totalMemory) * 100;
      
      // Get CPU info and load average
      const cpuInfo = os.cpus();
      const loadAvg = os.loadavg();
      
      // Calculate CPU usage approximation
      const cpuUsagePercent = await this.getCpuUsageApproximation();
      
      // Get disk usage
      const diskUsage = await this.getDiskUsage();
      
      return {
        memory: {
          used: usedMemory,
          total: totalMemory,
          free: freeMemory,
          usagePercent: Math.round(memoryUsagePercent * 100) / 100,
          rss: memUsage.rss,
          heapUsed: memUsage.heapUsed,
          heapTotal: memUsage.heapTotal,
          external: memUsage.external
        },
        cpu: {
          usagePercent: Math.round(cpuUsagePercent * 100) / 100,
          count: cpuInfo.length,
          loadAvg: loadAvg,
          model: cpuInfo[0]?.model || 'Unknown'
        },
        disk: diskUsage,
        uptime,
        platform: {
          nodeVersion: process.version,
          platform: process.platform,
          arch: process.arch,
          hostname: os.hostname(),
          release: os.release()
        },
        network: {
          interfaces: Object.keys(os.networkInterfaces()).length
        }
      };
    } catch (error) {
      // Fallback to basic metrics if os module fails
      console.warn('Failed to get detailed system metrics, using basic fallback:', error);
      
      const totalMemory = memUsage.heapTotal + memUsage.external + memUsage.arrayBuffers;
      const usedMemory = memUsage.heapUsed;
      const memoryUsagePercent = (usedMemory / totalMemory) * 100;
      
      return {
        memory: {
          used: usedMemory,
          total: totalMemory,
          usagePercent: Math.round(memoryUsagePercent * 100) / 100,
          rss: memUsage.rss,
          heapUsed: memUsage.heapUsed,
          heapTotal: memUsage.heapTotal
        },
        cpu: {
          usagePercent: await this.getCpuUsageApproximation()
        },
        disk: await this.getDiskUsage(),
        uptime,
        platform: {
          nodeVersion: process.version,
          platform: process.platform,
          arch: process.arch
        }
      };
    }
  }

  private async getCpuUsageApproximation(): Promise<number> {
    // Improved CPU usage approximation using multiple samples
    const samples = 3;
    let totalDelay = 0;
    
    for (let i = 0; i < samples; i++) {
      const start = process.hrtime.bigint();
      await new Promise(resolve => setImmediate(resolve));
      const delay = Number(process.hrtime.bigint() - start) / 1000000;
      totalDelay += delay;
      
      // Small delay between samples
      if (i < samples - 1) {
        await new Promise(resolve => setTimeout(resolve, 10));
      }
    }
    
    const avgDelay = totalDelay / samples;
    
    // More sophisticated calculation
    // Normal delay should be < 1ms, anything > 5ms indicates pressure
    return Math.min(Math.max((avgDelay / 5) * 100, 0), 100);
  }

  private async getDiskUsage(): Promise<{ used: number; total: number; free: number; usagePercent: number; path: string }> {
    try {
      const { execSync } = await import('child_process');
      const path = process.cwd();
      
      // Use df command for better compatibility
      const result = execSync(`df -B1 ${path}`, { encoding: 'utf8' });
      const lines = result.trim().split('\n');
      
      if (lines.length >= 2) {
        const parts = lines[1].trim().split(/\s+/);
        if (parts.length >= 6) {
          const total = parseInt(parts[1]) || 0;
          const used = parseInt(parts[2]) || 0;
          const free = parseInt(parts[3]) || 0;
          const usagePercent = total > 0 ? (used / total) * 100 : 0;
          
          return {
            used,
            total,
            free,
            usagePercent: Math.round(usagePercent * 100) / 100,
            path
          };
        }
      }
      
      // Fallback if df command fails
      return {
        used: 0,
        total: 0,
        free: 0,
        usagePercent: 0,
        path: path
      };
    } catch (error) {
      console.warn('Failed to get disk usage:', error);
      return {
        used: 0,
        total: 0,
        free: 0,
        usagePercent: 0,
        path: process.cwd()
      };
    }
  }
}