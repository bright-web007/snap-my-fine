// kafka-consumer.ts
// Fixed version with improved reliability and removed potentially hanging calls

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

    console.log(`📡 Kafka config: brokers=${brokers.join(',')}, clientId=${clientId}, groupId=${groupId}`);

    this.kafka = new Kafka({
      clientId,
      brokers,
      logLevel: process.env.NODE_ENV === 'development' ? logLevel.INFO : logLevel.WARN,
      connectionTimeout: 10000,
      authenticationTimeout: 5000,
      reauthenticationThreshold: 10000,
      requestTimeout: 30000,
      enforceRequestTimeout: false,
      retry: {
        initialRetryTime: 300,
        retries: 10,
        maxRetryTime: 30000,
        factor: 2,
        multiplier: 1.5,
      }
    });

    this.consumer = this.kafka.consumer({
      groupId,
      sessionTimeout: parseInt(process.env.KAFKA_SESSION_TIMEOUT || '30000'),
      heartbeatInterval: parseInt(process.env.KAFKA_HEARTBEAT_INTERVAL || '3000'),
      allowAutoTopicCreation: true,
      maxWaitTimeInMs: 5000,
      rebalanceTimeout: 60000,
      retry: {
        initialRetryTime: 300,
        retries: 10,
      }
    });

    // Event listeners for debugging and state management
    this.consumer.on('consumer.connect', () => {
      console.log('✅ [Kafka Event] Consumer connected');
      this.isConnected = true;
    });

    this.consumer.on('consumer.disconnect', () => {
      console.log('🔌 [Kafka Event] Consumer disconnected');
      this.isConnected = false;
      this.isConsuming = false;
    });

    this.consumer.on('consumer.group_join', (event) => {
      console.log('👥 [Kafka Event] Consumer joined group:', JSON.stringify(event.payload));
    });

    this.consumer.on('consumer.rebalancing', () => {
      console.log('⚖️ [Kafka Event] Consumer rebalancing...');
    });

    this.consumer.on('consumer.fetch_start', () => {
      console.log('📥 [Kafka Event] Fetch started');
    });

    this.consumer.on('consumer.start_batch_process', (event) => {
      console.log(`📦 [Kafka Event] Processing batch: ${event.payload.batchSize} messages`);
    });

    this.consumer.on('consumer.crash', (event) => {
      console.error('💥 [Kafka Event] Consumer crashed:', event.payload.error);
      this.isConsuming = false;
      this.errors.push(`Consumer crash: ${event.payload.error.message}`);
    });

    this.emailService = new ReminderEmailService();
    this.dlqService = new DeadLetterQueueService(3, 5000, 300000);
    this.metricsCollector = new MetricsCollector();
  }

  /**
   * Connect to Kafka broker
   */
  async connect(): Promise<void> {
    if (this.isConnected) {
      console.log('ℹ️ Already connected to Kafka');
      return;
    }

    try {
      console.log('🔗 Connecting to Kafka broker...');
      await this.consumer.connect();
      this.isConnected = true;
      console.log('✅ Successfully connected to Kafka broker');
    } catch (error) {
      const errorMessage = `Failed to connect to Kafka: ${error instanceof Error ? error.message : 'Unknown error'}`;
      this.errors.push(errorMessage);
      this.isConnected = false;
      console.error('❌', errorMessage);
      throw error;
    }
  }

  /**
   * Subscribe to reminder topics
   * FIXED: Removed the potentially hanging admin.fetchTopicMetadata() call
   */
  async subscribe(): Promise<void> {
    try {
      console.log('📋 Subscribing to reminder topics...');
      console.log('📋 Topics:', this.TOPICS.join(', '));
      
      // Subscribe to all topics at once
      await this.consumer.subscribe({ 
        topics: this.TOPICS,
        fromBeginning: false // Only process new messages
      });
      
      console.log('✅ Successfully subscribed to all reminder topics');
      
      // NOTE: Removed the admin.fetchTopicMetadata() call as it was potentially hanging
      // If you need topic metadata, do it separately with a timeout:
      // await this.fetchTopicMetadataWithTimeout();
      
    } catch (error) {
      const errorMessage = `Failed to subscribe to topics: ${error instanceof Error ? error.message : 'Unknown error'}`;
      this.errors.push(errorMessage);
      console.error('❌', errorMessage);
      throw error;
    }
  }

  /**
   * Optional: Fetch topic metadata with timeout
   * Call this separately if you need topic info
   */
  async fetchTopicMetadataWithTimeout(timeoutMs = 5000): Promise<void> {
    const admin = this.kafka.admin();
    
    try {
      // Create a timeout promise
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Topic metadata fetch timeout')), timeoutMs);
      });

      await admin.connect();
      
      const metadataPromise = admin.fetchTopicMetadata({ topics: this.TOPICS });
      const topicMetadata = await Promise.race([metadataPromise, timeoutPromise]);
      
      console.log('📊 Topic metadata:', JSON.stringify(topicMetadata, null, 2));
      
    } catch (error) {
      console.warn('⚠️ Could not fetch topic metadata:', error instanceof Error ? error.message : 'Unknown error');
      // Don't throw - this is optional
    } finally {
      try {
        await admin.disconnect();
      } catch {
        // Ignore disconnect errors
      }
    }
  }

  /**
   * Start consuming messages
   * FIXED: Proper async handling and state management
   */
  async startConsuming(): Promise<void> {
    if (this.isConsuming) {
      console.log('ℹ️ Consumer is already consuming');
      return;
    }

    if (!this.isConnected) {
      throw new Error('Consumer is not connected. Call connect() first.');
    }

    try {
      console.log('▶️ Starting message consumption...');
      console.log('🔍 Debug: Consumer group ID:', process.env.KAFKA_GROUP_ID || 'snapmyfine-reminder-group');
      console.log('🔍 Debug: Broker list:', process.env.KAFKA_BROKERS || 'localhost:9092');
      
      // Start the retry processor for DLQ
      this.startRetryProcessor();

      console.log('🎧 Consumer now listening for messages on topics:', this.TOPICS.join(', '));
      console.log('🚀 About to call consumer.run() - this should register with broker...');

      // Set consuming flag just before calling run()
      this.isConsuming = true;

      // consumer.run() is blocking - it runs until consumer stops
      // We need to run it without await to avoid blocking
      const consumePromise = this.consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat }) => {
          console.log(`📨 Received message from ${topic}:${partition}`);
          await this.processMessage(topic, partition, message, heartbeat);
        },
        // Auto-commit settings
        autoCommit: true,
        autoCommitInterval: 5000,
        autoCommitThreshold: 100,
      });

      // Handle the consume promise in background
      consumePromise
        .then(() => {
          console.log('⏹️ Consumer stopped normally - this should only happen on shutdown');
          this.isConsuming = false;
        })
        .catch((error) => {
          console.error('❌ Consumer run error:', error);
          console.error('❌ Error details:', error.stack);
          this.isConsuming = false;
          this.errors.push(`Consumer run failed: ${error.message}`);
        });

      // Wait longer for consumer to properly initialize and join the group
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Check if we're still connected after the delay
      if (!this.isConnected) {
        this.isConsuming = false;
        throw new Error('Consumer disconnected during startup');
      }
      
      console.log('✅ Consumer.run() initiated and should be active');
      return; // Return immediately while consumer runs in background

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
    let messageData: any = null;
    
    try {
      // Heartbeat to prevent session timeout
      await heartbeat();

      // Parse message
      if (!message.value) {
        console.warn(`⚠️ Received empty message from ${topic}:${partition}:${message.offset}`);
        return;
      }

      messageData = JSON.parse(message.value.toString());
      
      console.log(`📨 Processing message from ${topic}:${partition}:${message.offset}`, {
        timestamp: message.timestamp,
        key: message.key?.toString()
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
      
      console.log(`✅ Successfully processed message from ${topic}:${partition}:${message.offset} in ${processingTime}ms`);

    } catch (error) {
      const processingTime = Date.now() - startTime;
      const errorMessage = `Failed to process message from ${topic}:${partition}:${message.offset}: ${error instanceof Error ? error.message : 'Unknown error'}`;
      
      this.errors.push(errorMessage);
      console.error(`❌ ${errorMessage} (took ${processingTime}ms)`);
      
      // Record error in metrics
      this.metricsCollector.recordError(
        topic, 
        error instanceof Error ? error.message : 'Unknown error',
        message.key?.toString(),
        processingTime
      );
      
      // Add to Dead Letter Queue for retry (only if we have message data)
      if (messageData) {
        await this.dlqService.addFailedMessage(
          topic,
          partition,
          message.offset || '0',
          messageData,
          error as Error
        );
      }
      
      // Log message content for debugging
      if (process.env.NODE_ENV === 'development') {
        console.error('📄 Message content:', message.value?.toString().substring(0, 500));
      }
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
      console.log('✅ Successfully disconnected from Kafka');
    } catch (error) {
      const errorMessage = `Failed to disconnect from Kafka: ${error instanceof Error ? error.message : 'Unknown error'}`;
      console.error('❌', errorMessage);
      throw error;
    }
  }

  /**
   * Start automatic retry processor for DLQ messages
   */
  private startRetryProcessor(): void {
    // Clear any existing interval
    if (this.retryIntervalId) {
      clearInterval(this.retryIntervalId);
    }

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
      
      console.log(`✅ Successfully retried message: ${failedMessage.id}`);

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
   * Clear error log
   */
  clearErrors(): void {
    this.errors = [];
  }
}
