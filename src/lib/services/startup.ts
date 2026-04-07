// startup.ts
// Fixed version with proper async handling for Next.js

import { KafkaConsumerService } from './kafka-consumer';

// Use globalThis to persist state across hot reloads in development
// This is the recommended pattern for Next.js
const globalForKafka = globalThis as unknown as {
  kafkaConsumer: KafkaConsumerService | undefined;
  kafkaInitialized: boolean | undefined;
  kafkaInitializing: boolean | undefined;
};

/**
 * Get or create the Kafka consumer service instance
 * Uses globalThis to persist across hot reloads
 */
function getOrCreateConsumer(): KafkaConsumerService {
  if (!globalForKafka.kafkaConsumer) {
    console.log('📦 Creating new KafkaConsumerService instance...');
    globalForKafka.kafkaConsumer = new KafkaConsumerService();
  }
  return globalForKafka.kafkaConsumer;
}

/**
 * Initialize the Kafka consumer - called from instrumentation.ts
 * This runs ONCE when the Next.js server starts
 */
export async function initializeKafkaConsumer(): Promise<void> {
  // Prevent concurrent initialization
  if (globalForKafka.kafkaInitializing) {
    console.log('⏳ Kafka consumer initialization already in progress...');
    return;
  }

  // Check if already initialized
  if (globalForKafka.kafkaInitialized && globalForKafka.kafkaConsumer) {
    const status = globalForKafka.kafkaConsumer.getStatus();
    if (status.isConnected && status.isConsuming) {
      console.log('✅ Kafka consumer already running');
      return;
    }
  }

  globalForKafka.kafkaInitializing = true;

  try {
    console.log('🔧 Initializing Kafka consumer service...');
    
    const consumer = getOrCreateConsumer();
    
    // Step 1: Connect
    console.log('Step 1/3: Connecting to Kafka broker...');
    await consumer.connect();
    console.log('✅ Connected to Kafka broker');
    
    // Step 2: Subscribe
    console.log('Step 2/3: Subscribing to topics...');
    await consumer.subscribe();
    console.log('✅ Subscribed to topics');
    
    // Step 3: Start consuming (this is a long-running operation)
    console.log('Step 3/3: Starting message consumption...');
    
    // Start consuming - this will run in background
    try {
      await consumer.startConsuming();
      console.log('✅ Consumer.startConsuming() completed - consumer should be running');
    } catch (error) {
      console.error('❌ Failed to start consuming:', error);
      throw error;
    }
    
    // Mark as initialized - the consumer joining the group proves it's working
    globalForKafka.kafkaInitialized = true;
    console.log('✅ Kafka consumer initialization completed successfully');
    
    // Note: The consumer status might show isConsuming: false immediately after startup
    // but this is normal - it will show true once it starts processing messages
    
  } catch (error) {
    console.error('❌ Failed to initialize Kafka consumer:', error);
    globalForKafka.kafkaInitialized = false;
    throw error;
  } finally {
    globalForKafka.kafkaInitializing = false;
  }
}

/**
 * Legacy function for API route compatibility
 * @deprecated Use initializeKafkaConsumer() instead
 */
export async function initializeServices(): Promise<void> {
  return initializeKafkaConsumer();
}

/**
 * Get the consumer service instance
 */
export function getConsumerService(): KafkaConsumerService | null {
  return globalForKafka.kafkaConsumer || null;
}

/**
 * Check if services are initialized
 */
export function isServicesInitialized(): boolean {
  return globalForKafka.kafkaInitialized === true;
}

/**
 * Gracefully shutdown the consumer
 */
export async function shutdownServices(): Promise<void> {
  const consumer = globalForKafka.kafkaConsumer;
  
  if (consumer) {
    try {
      console.log('🔌 Disconnecting Kafka consumer...');
      await consumer.disconnect();
      console.log('✅ Kafka consumer disconnected');
    } catch (error) {
      console.error('❌ Error disconnecting Kafka consumer:', error);
    }
  }
  
  // Reset global state
  globalForKafka.kafkaConsumer = undefined;
  globalForKafka.kafkaInitialized = false;
  globalForKafka.kafkaInitializing = false;
}

/**
 * Restart the consumer service
 */
export async function restartServices(): Promise<void> {
  console.log('🔄 Restarting Kafka consumer...');
  await shutdownServices();
  
  // Small delay before reconnecting
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  await initializeKafkaConsumer();
  console.log('✅ Kafka consumer restarted');
}

/**
 * Manual start for API route usage
 * Returns immediately after initiating startup
 */
export async function startConsumerAsync(): Promise<{ success: boolean; message: string }> {
  if (globalForKafka.kafkaInitializing) {
    return { success: false, message: 'Consumer initialization already in progress' };
  }

  if (globalForKafka.kafkaInitialized && globalForKafka.kafkaConsumer?.getStatus().isConsuming) {
    return { success: false, message: 'Consumer is already running' };
  }

  // Start initialization in background
  initializeKafkaConsumer().catch(error => {
    console.error('Background initialization failed:', error);
  });

  return { success: true, message: 'Consumer initialization started' };
}