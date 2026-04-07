export interface ConsumerMetrics {
  // Message processing metrics
  messagesProcessed: number;
  messagesPerMinute: number;
  averageProcessingTime: number;
  
  // Error metrics
  totalErrors: number;
  errorRate: number;
  recentErrors: ErrorMetric[];
  
  // DLQ metrics
  dlqMessageCount: number;
  dlqRetryableCount: number;
  dlqPermanentlyFailedCount: number;
  
  // Consumer health
  uptime: number;
  isHealthy: boolean;
  lastHeartbeat: string;
  
  // Topic metrics
  topicStats: TopicStat[];
  
  // Performance metrics
  memoryUsage?: NodeJS.MemoryUsage;
  cpuUsage?: number;
}

export interface ErrorMetric {
  timestamp: string;
  topic: string;
  error: string;
  messageId?: string;
  processingTime?: number;
}

export interface TopicStat {
  topic: string;
  messagesProcessed: number;
  lastMessageAt?: string;
  averageProcessingTime: number;
  errorCount: number;
}

export interface PerformanceSnapshot {
  timestamp: string;
  messagesProcessed: number;
  memoryUsage: NodeJS.MemoryUsage;
  cpuUsage?: number;
}

export class MetricsCollector {
  private startTime: number;
  private messageProcessingTimes: number[] = [];
  private errorMetrics: ErrorMetric[] = [];
  private topicStats: Map<string, TopicStat> = new Map();
  private performanceSnapshots: PerformanceSnapshot[] = [];
  private maxHistorySize: number = 1000;

  constructor() {
    this.startTime = Date.now();
    
    // Initialize topic stats for known topics
    const topics = [
      'fine.discount.week_left',
      'fine.discount.3days',
      'fine.discount.tomorrow',
      'fine.discount.final_hours',
      'fine.full.discount_expired',
      'fine.full.5days_left',
      'fine.full.final_day',
      'fine.enforcement.started',
      'fine.enforcement.overdue'
    ];

    topics.forEach(topic => {
      this.topicStats.set(topic, {
        topic,
        messagesProcessed: 0,
        averageProcessingTime: 0,
        errorCount: 0
      });
    });

    // Start periodic performance monitoring
    this.startPerformanceMonitoring();
  }

  /**
   * Record successful message processing
   */
  recordMessageProcessed(topic: string, processingTimeMs: number): void {
    // Update overall metrics
    this.messageProcessingTimes.push(processingTimeMs);
    if (this.messageProcessingTimes.length > this.maxHistorySize) {
      this.messageProcessingTimes = this.messageProcessingTimes.slice(-this.maxHistorySize);
    }

    // Update topic-specific metrics
    const topicStat = this.topicStats.get(topic);
    if (topicStat) {
      topicStat.messagesProcessed++;
      topicStat.lastMessageAt = new Date().toISOString();
      
      // Calculate rolling average processing time
      topicStat.averageProcessingTime = this.calculateRollingAverage(
        topicStat.averageProcessingTime,
        processingTimeMs,
        topicStat.messagesProcessed
      );
      
      this.topicStats.set(topic, topicStat);
    }
  }

  /**
   * Record message processing error
   */
  recordError(topic: string, error: string, messageId?: string, processingTime?: number): void {
    const errorMetric: ErrorMetric = {
      timestamp: new Date().toISOString(),
      topic,
      error,
      messageId,
      processingTime
    };

    this.errorMetrics.push(errorMetric);
    if (this.errorMetrics.length > this.maxHistorySize) {
      this.errorMetrics = this.errorMetrics.slice(-this.maxHistorySize);
    }

    // Update topic error count
    const topicStat = this.topicStats.get(topic);
    if (topicStat) {
      topicStat.errorCount++;
      this.topicStats.set(topic, topicStat);
    }
  }

  /**
   * Get current metrics
   */
  getMetrics(dlqStats?: any): ConsumerMetrics {
    const now = Date.now();
    const uptime = Math.floor((now - this.startTime) / 1000);
    const totalMessages = this.messageProcessingTimes.length;
    const totalErrors = this.errorMetrics.length;

    // Calculate messages per minute
    const messagesPerMinute = uptime > 0 ? Math.round((totalMessages / uptime) * 60) : 0;

    // Calculate average processing time
    const averageProcessingTime = this.messageProcessingTimes.length > 0
      ? this.messageProcessingTimes.reduce((sum, time) => sum + time, 0) / this.messageProcessingTimes.length
      : 0;

    // Calculate error rate
    const errorRate = totalMessages > 0 ? (totalErrors / totalMessages) * 100 : 0;

    // Get recent errors (last 10)
    const recentErrors = this.errorMetrics.slice(-10);

    // Health check - consider unhealthy if error rate > 10% or no messages in last 5 minutes
    const lastMessageTime = Math.max(...Array.from(this.topicStats.values())
      .map(stat => stat.lastMessageAt ? new Date(stat.lastMessageAt).getTime() : 0));
    const timeSinceLastMessage = now - lastMessageTime;
    const isHealthy = errorRate < 10 && (timeSinceLastMessage < 300000 || totalMessages === 0);

    return {
      messagesProcessed: totalMessages,
      messagesPerMinute,
      averageProcessingTime: Math.round(averageProcessingTime * 100) / 100,
      totalErrors,
      errorRate: Math.round(errorRate * 100) / 100,
      recentErrors,
      dlqMessageCount: dlqStats?.totalMessages || 0,
      dlqRetryableCount: dlqStats?.retryableMessages || 0,
      dlqPermanentlyFailedCount: dlqStats?.permanentlyFailed || 0,
      uptime,
      isHealthy,
      lastHeartbeat: new Date().toISOString(),
      topicStats: Array.from(this.topicStats.values()),
      memoryUsage: process.memoryUsage()
    };
  }

  /**
   * Get performance history
   */
  getPerformanceHistory(): PerformanceSnapshot[] {
    return this.performanceSnapshots.slice(-100); // Last 100 snapshots
  }

  /**
   * Reset all metrics
   */
  reset(): void {
    this.startTime = Date.now();
    this.messageProcessingTimes = [];
    this.errorMetrics = [];
    this.performanceSnapshots = [];
    
    // Reset topic stats
    this.topicStats.forEach((stat, topic) => {
      this.topicStats.set(topic, {
        topic,
        messagesProcessed: 0,
        averageProcessingTime: 0,
        errorCount: 0
      });
    });
  }

  /**
   * Export metrics for external monitoring systems
   */
  exportForPrometheus(): string {
    const metrics = this.getMetrics();
    const timestamp = Date.now();

    let prometheusFormat = '';
    
    // Basic metrics
    prometheusFormat += `# HELP kafka_consumer_messages_processed_total Total number of messages processed\n`;
    prometheusFormat += `# TYPE kafka_consumer_messages_processed_total counter\n`;
    prometheusFormat += `kafka_consumer_messages_processed_total ${metrics.messagesProcessed} ${timestamp}\n\n`;

    prometheusFormat += `# HELP kafka_consumer_errors_total Total number of processing errors\n`;
    prometheusFormat += `# TYPE kafka_consumer_errors_total counter\n`;
    prometheusFormat += `kafka_consumer_errors_total ${metrics.totalErrors} ${timestamp}\n\n`;

    prometheusFormat += `# HELP kafka_consumer_error_rate Error rate percentage\n`;
    prometheusFormat += `# TYPE kafka_consumer_error_rate gauge\n`;
    prometheusFormat += `kafka_consumer_error_rate ${metrics.errorRate} ${timestamp}\n\n`;

    prometheusFormat += `# HELP kafka_consumer_processing_time_avg Average message processing time in milliseconds\n`;
    prometheusFormat += `# TYPE kafka_consumer_processing_time_avg gauge\n`;
    prometheusFormat += `kafka_consumer_processing_time_avg ${metrics.averageProcessingTime} ${timestamp}\n\n`;

    // DLQ metrics
    prometheusFormat += `# HELP kafka_consumer_dlq_messages Dead Letter Queue message count\n`;
    prometheusFormat += `# TYPE kafka_consumer_dlq_messages gauge\n`;
    prometheusFormat += `kafka_consumer_dlq_messages ${metrics.dlqMessageCount} ${timestamp}\n\n`;

    // Topic-specific metrics
    metrics.topicStats.forEach(topicStat => {
      prometheusFormat += `kafka_consumer_topic_messages_processed_total{topic="${topicStat.topic}"} ${topicStat.messagesProcessed} ${timestamp}\n`;
      prometheusFormat += `kafka_consumer_topic_errors_total{topic="${topicStat.topic}"} ${topicStat.errorCount} ${timestamp}\n`;
    });

    return prometheusFormat;
  }

  /**
   * Calculate rolling average
   */
  private calculateRollingAverage(currentAvg: number, newValue: number, count: number): number {
    return ((currentAvg * (count - 1)) + newValue) / count;
  }

  /**
   * Start periodic performance monitoring
   */
  private startPerformanceMonitoring(): void {
    setInterval(() => {
      const snapshot: PerformanceSnapshot = {
        timestamp: new Date().toISOString(),
        messagesProcessed: this.messageProcessingTimes.length,
        memoryUsage: process.memoryUsage()
      };

      this.performanceSnapshots.push(snapshot);
      
      // Keep only last 1000 snapshots
      if (this.performanceSnapshots.length > 1000) {
        this.performanceSnapshots = this.performanceSnapshots.slice(-1000);
      }
    }, 30000); // Every 30 seconds
  }
}