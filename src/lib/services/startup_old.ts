import { KafkaConsumerService } from './kafka-consumer';

let consumerService: KafkaConsumerService | null = null;
let isInitialized = false;

export async function initializeServices() {
  if (isInitialized) {
    console.log('Services already initialized');
    return;
  }

  try {
    console.log('Initializing SnapMyFine services...');
    
    // Initialize Kafka consumer
    console.log('Step 1: Creating KafkaConsumerService...');
    consumerService = new KafkaConsumerService();
    
    console.log('Step 2: Connecting to Kafka...');
    await consumerService.connect();
    
    console.log('Step 3: Subscribing to topics...');
    await consumerService.subscribe();
    
    console.log('Step 4: Starting consumption (non-blocking)...');
    // Start consuming in background using setTimeout to ensure it runs after this function returns
    setTimeout(async () => {
      try {
        console.log('Calling startConsuming in background...');
        console.log('Consumer service instance:', !!consumerService);
        console.log('Consumer service isConnected:', consumerService.getStatus().isConnected);
        
        await consumerService.startConsuming();
        console.log('startConsuming completed successfully');
      } catch (error) {
        console.error('Consumer error during consumption:', error);
      }
    }, 100); // Give a bit more time
    
    console.log('Services initialized successfully, consumption starting in background');
    
    console.log('Step 5: Marking as initialized...');
    isInitialized = true;
    console.log('SnapMyFine services initialized successfully');
    
  } catch (error) {
    console.error('Failed to initialize services:', error);
    // Reset state on failure
    isInitialized = false;
    consumerService = null;
    throw error;
  }
}

export function getConsumerService(): KafkaConsumerService | null {
  return consumerService;
}

export function isServicesInitialized(): boolean {
  return isInitialized;
}

// Graceful shutdown
export async function shutdownServices() {
  if (consumerService) {
    try {
      await consumerService.disconnect();
      console.log('Services shut down gracefully');
    } catch (error) {
      console.error('Error shutting down services:', error);
    }
  }
  
  // Reset state
  consumerService = null;
  isInitialized = false;
}

// Force restart services
export async function restartServices() {
  await shutdownServices();
  await initializeServices();
}