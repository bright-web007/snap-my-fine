import { Kafka, Consumer, KafkaMessage, logLevel } from 'kafkajs';
import { FineReminderEventSchema } from '@/lib/schema';
import { ReminderEmailService } from '@/lib/services/reminder-email';
import { DeadLetterQueueService, FailedMessage } from '@/lib/services/dead-letter-queue';
import { MetricsCollector } from '@/lib/services/metrics-collector';

export class KafkaConsumerService {
  private kafka: Kafka;
  private consumer: Consumer;
  private emailService: ReminderEmailService;
  private dlqService: DeadLetterQueueService;
  private metricsCollector: MetricsCollector;
  private isConnected = false;
  private isConsuming = false;
  private messagesProcessed = 0;
  private errors: string[] = [];
  private retryIntervalId: NodeJS.Timeout | null = null;

  // Kafka topics to subscribe to
  private readonly TOPICS = [
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

  constructor() {
    const brokers = process.env.KAFKA_BROKERS?.split(',') || ['localhost:9092'];
    const clientId = process.env.KAFKA_CLIENT_ID || 'snapmyfine-consumer';
    const groupId = process.env.KAFKA_GROUP_ID || 'snapmyfine-reminder-group';

    this.kafka = new Kafka({
      clientId,
      brokers,
      logLevel: process.env.NODE_ENV === 'development' ? logLevel.INFO : logLevel.WARN,
      connectionTimeout: 10000, // Increased timeout for external brokers
      authenticationTimeout: 5000, // Increased timeout
      reauthenticationThreshold: 10000,
      requestTimeout: 30000, // Increased request timeout
      enforceRequestTimeout: false,
      retry: {
        initialRetryTime: 100,
        retries: 8
      }
    });

    this.consumer = this.kafka.consumer({
      groupId,
      sessionTimeout: parseInt(process.env.KAFKA_SESSION_TIMEOUT || '30000'),
      heartbeatInterval: parseInt(process.env.KAFKA_HEARTBEAT_INTERVAL || '3000'),
      allowAutoTopicCreation: true, // Allow auto-creation of topics
      maxWaitTimeInMs: 10000, // Increased wait time
      rebalanceTimeout: 60000, // Added rebalance timeout
    });

    // Add event listeners for debugging
    this.consumer.on('consumer.connect', () => {
      console.log('Consumer connected to Kafka');
    });

    this.consumer.on('consumer.disconnect', () => {
      console.log('Consumer disconnected from Kafka');
    });

    this.consumer.on('consumer.group_join', (event) => {
      console.log('Consumer joined group:', event);
    });

    this.consumer.on('consumer.rebalancing', (event) => {
      console.log('Consumer rebalancing:', event);
    });

    this.emailService = new ReminderEmailService();
    this.dlqService = new DeadLetterQueueService(
      3, // max retries
      5000, // initial retry delay (5 seconds)
      300000 // max retry delay (5 minutes)
    );
    this.metricsCollector = new MetricsCollector();

    // Start retry processor
    this.startRetryProcessor();
  }

  /**
   * Connect to Kafka broker
   */
  async connect(): Promise<void> {
    try {
      console.log('Connecting to Kafka broker...');
      await this.consumer.connect();
      this.isConnected = true;
      console.log('Successfully connected to Kafka broker');
    } catch (error) {
      const errorMessage = `Failed to connect to Kafka: ${error instanceof Error ? error.message : 'Unknown error'}`;
      this.errors.push(errorMessage);
      console.error('❌', errorMessage);
      throw error;
    }
  }

  /**
   * Subscribe to reminder topics
   */
  async subscribe(): Promise<void> {
    try {
      console.log('Subscribing to reminder topics...');
      
      // Subscribe to all topics at once (more efficient)
      await this.consumer.subscribe({ 
        topics: this.TOPICS,
        fromBeginning: false // Only process new messages
      });
      
      console.log('Successfully subscribed to all reminder topics:', this.TOPICS.join(', '));
      
      // Test: Let's also log the admin client info to see topic status
      const admin = this.kafka.admin();
      try {
        await admin.connect();
        const topicMetadata = await admin.fetchTopicMetadata({ topics: this.TOPICS });
        console.log('Topic metadata:', topicMetadata);
        await admin.disconnect();
      } catch (adminError) {
        console.log('Could not fetch topic metadata:', adminError.message);
      }
      
    } catch (error) {
      const errorMessage = `Failed to subscribe to topics: ${error instanceof Error ? error.message : 'Unknown error'}`;
      this.errors.push(errorMessage);
      console.error(errorMessage);
      throw error;
    }
  }

  /**
   * Start consuming messages
   */
  async startConsuming(): Promise<void> {
    try {
      console.log('=== ENTERING startConsuming method ===');
      console.log('Starting message consumption...');
      this.isConsuming = true;

      // Note: consumer.run() is a blocking operation that runs until the consumer is stopped
      console.log('Consumer starting to listen for messages...');
      
      await this.consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat }) => {
          await this.processMessage(topic, partition, message, heartbeat);
        },
        eachBatch: undefined, // We'll process messages individually for now
      });

      // This line will only execute if the consumer stops
      console.log('Consumer stopped running');
      this.isConsuming = false;
    } catch (error) {
      const errorMessage = `Failed to start consuming: ${error instanceof Error ? error.message : 'Unknown error'}`;
      this.errors.push(errorMessage);
      this.isConsuming = false;
      console.error('❌', errorMessage);
      throw error;
    }
  }

  /**
   * Process individual Kafka message
   */
  private async processMessage(
    topic: string, 
    partition: number, 
    message: KafkaMessage,
    heartbeat: () => Promise<void>
  ): Promise<void> {
    const startTime = Date.now();
    
    try {
      // Heartbeat to prevent session timeout
      await heartbeat();

      // Parse message
      if (!message.value) {
        console.warn(`⚠️ Received empty message from ${topic}:${partition}`);
        return;
      }

      const messageData = JSON.parse(message.value.toString());
      console.log(`📨 Processing message from ${topic}:${partition}`, {
        offset: message.offset,
        timestamp: message.timestamp,
        key: message.key?.toString(),
        headers: message.headers
      });

      // Add event_type to message data
      const eventData = {
        ...messageData,
        event_type: topic
      };

      // Validate message against schema
      const validatedEvent = FineReminderEventSchema.parse(eventData);

      // Process the reminder event
      await this.emailService.processReminderEvent(validatedEvent);

      this.messagesProcessed++;
      
      const processingTime = Date.now() - startTime;
      
      // Record successful processing in metrics
      this.metricsCollector.recordMessageProcessed(topic, processingTime);
      
      console.log(`Successfully processed message from ${topic} in ${processingTime}ms`);

    } catch (error) {
      const processingTime = Date.now() - startTime;
      const errorMessage = `Failed to process message from ${topic}:${partition}: ${error instanceof Error ? error.message : 'Unknown error'}`;
      
      this.errors.push(errorMessage);
      console.error(`${errorMessage} (took ${processingTime}ms)`);
      
      // Record error in metrics
      this.metricsCollector.recordError(
        topic, 
        error instanceof Error ? error.message : 'Unknown error',
        message.key?.toString(),
        processingTime
      );
      
      // Add to Dead Letter Queue for retry
      await this.dlqService.addFailedMessage(
        topic,
        partition,
        message.offset || '0',
        messageData,
        error as Error
      );
      
      console.error('Message content:', message.value?.toString());
    }
  }

  /**
   * Gracefully disconnect from Kafka
   */
  async disconnect(): Promise<void> {
    try {
      console.log('🔌 Disconnecting from Kafka...');
      this.isConsuming = false;

      // Stop retry processor
      if (this.retryIntervalId) {
        clearInterval(this.retryIntervalId);
        this.retryIntervalId = null;
      }

      await this.consumer.disconnect();
      this.isConnected = false;
      console.log('Successfully disconnected from Kafka');
    } catch (error) {
      const errorMessage = `Failed to disconnect from Kafka: ${error instanceof Error ? error.message : 'Unknown error'}`;
      console.error(errorMessage);
      throw error;
    }
  }

  /**
   * Start automatic retry processor for DLQ messages
   */
  private startRetryProcessor(): void {
    this.retryIntervalId = setInterval(async () => {
      if (!this.isConsuming) return;

      const messagesToRetry = this.dlqService.getMessagesForRetry();
      
      if (messagesToRetry.length > 0) {
        console.log(`🔄 Processing ${messagesToRetry.length} messages for retry...`);
        
        for (const failedMessage of messagesToRetry) {
          try {
            await this.retryFailedMessage(failedMessage);
          } catch (error) {
            console.error(`Failed to retry message ${failedMessage.id}:`, error);
          }
        }
      }
    }, 30000); // Check for retries every 30 seconds
  }

  /**
   * Retry a failed message
   */
  private async retryFailedMessage(failedMessage: FailedMessage): Promise<void> {
    console.log(`🔄 Retrying message: ${failedMessage.id} (attempt ${failedMessage.attempts + 1})`);
    
    try {
      // Add event_type to message data
      const eventData = {
        ...failedMessage.originalMessage,
        event_type: failedMessage.topic
      };

      // Validate message against schema
      const validatedEvent = FineReminderEventSchema.parse(eventData);

      // Process the reminder event
      await this.emailService.processReminderEvent(validatedEvent);

      // Success - remove from DLQ
      this.dlqService.removeMessage(failedMessage.id);
      this.messagesProcessed++;
      
      console.log(`Successfully retried message: ${failedMessage.id}`);

    } catch (error) {
      // Add back to DLQ with incremented attempt count
      await this.dlqService.addFailedMessage(
        failedMessage.topic,
        failedMessage.partition,
        failedMessage.offset,
        failedMessage.originalMessage,
        error as Error
      );
      throw error;
    }
  }

  /**
   * Get consumer status
   */
  getStatus() {
    const dlqStats = this.dlqService.getStats();
    const metrics = this.metricsCollector.getMetrics(dlqStats);
    
    return {
      isConnected: this.isConnected,
      isConsuming: this.isConsuming,
      messagesProcessed: this.messagesProcessed,
      lastMessageAt: new Date().toISOString(),
      errors: this.errors.slice(-10), // Keep last 10 errors
      topics: this.TOPICS,
      dlq: dlqStats,
      metrics
    };
  }

  /**
   * Get detailed metrics
   */
  getMetrics() {
    const dlqStats = this.dlqService.getStats();
    return this.metricsCollector.getMetrics(dlqStats);
  }

  /**
   * Get performance history
   */
  getPerformanceHistory() {
    return this.metricsCollector.getPerformanceHistory();
  }

  /**
   * Export metrics in Prometheus format
   */
  exportPrometheusMetrics(): string {
    return this.metricsCollector.exportForPrometheus();
  }

  /**
   * Reset metrics
   */
  resetMetrics(): void {
    this.metricsCollector.reset();
    this.messagesProcessed = 0;
    this.errors = [];
  }

  /**
   * Get Dead Letter Queue statistics
   */
  getDLQStats() {
    return this.dlqService.getStats();
  }

  /**
   * Get all failed messages
   */
  getFailedMessages(): FailedMessage[] {
    return this.dlqService.getAllFailedMessages();
  }

  /**
   * Manually retry a specific failed message
   */
  async retryMessage(messageId: string): Promise<boolean> {
    return this.dlqService.retryMessage(messageId, async (message) => {
      const eventData = { ...message, event_type: message.topic || 'unknown' };
      const validatedEvent = FineReminderEventSchema.parse(eventData);
      await this.emailService.processReminderEvent(validatedEvent);
    });
  }

  /**
   * Clear all DLQ messages
   */
  clearDLQ(): void {
    this.dlqService.clearAll();
  }

  /**
   * Reset error log
   */
  clearErrors(): void {
    this.errors = [];
  }
}