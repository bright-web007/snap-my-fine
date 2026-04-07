#!/usr/bin/env node

/**
 * Kafka Consumer Startup Script
 * 
 * This script initializes and starts the Kafka consumer service.
 * It can be used for development, testing, or as a standalone service.
 */

import { KafkaConsumerService } from '../src/lib/services/kafka-consumer';

// Configuration
const config = {
  autoStart: process.env.KAFKA_AUTO_START === 'true',
  gracefulShutdown: true,
  healthCheckInterval: 30000, // 30 seconds
};

// Global consumer instance
let consumerService: KafkaConsumerService | null = null;

/**
 * Initialize and start the Kafka consumer
 */
async function startConsumer(): Promise<void> {
  try {
    console.log('🚀 Starting SnapMyFine Kafka Consumer Service...');
    
    // Validate environment variables
    const requiredEnvVars = [
      'KAFKA_BROKERS',
      'KAFKA_CLIENT_ID', 
      'KAFKA_GROUP_ID',
      'NEXT_HERACLES_ENDPOINT'
    ];
    
    const missingVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
    if (missingVars.length > 0) {
      throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
    }

    // Create and initialize consumer
    consumerService = new KafkaConsumerService();
    
    // Connect to Kafka
    await consumerService.connect();
    console.log('✅ Connected to Kafka broker');
    
    // Subscribe to topics
    await consumerService.subscribe();
    console.log('✅ Subscribed to reminder topics');
    
    // Start consuming
    await consumerService.startConsuming();
    console.log('✅ Consumer is now processing messages');
    
    // Setup health monitoring
    if (config.healthCheckInterval > 0) {
      startHealthMonitoring();
    }
    
    console.log('🎉 Kafka Consumer Service is fully operational!');
    console.log(`📊 Monitoring available at: /api/kafka/consumer/status`);
    console.log(`📈 Metrics available at: /api/kafka/metrics`);

  } catch (error) {
    console.error('❌ Failed to start Kafka Consumer Service:', error);
    process.exit(1);
  }
}

/**
 * Gracefully stop the consumer
 */
async function stopConsumer(): Promise<void> {
  if (consumerService) {
    try {
      console.log('🛑 Stopping Kafka Consumer Service...');
      await consumerService.disconnect();
      console.log('✅ Kafka Consumer Service stopped gracefully');
    } catch (error) {
      console.error('❌ Error stopping consumer:', error);
    }
  }
}

/**
 * Start periodic health monitoring
 */
function startHealthMonitoring(): void {
  setInterval(() => {
    if (consumerService) {
      const status = consumerService.getStatus();
      const metrics = consumerService.getMetrics();
      
      // Log health summary
      console.log(`💓 Health Check - Connected: ${status.isConnected}, ` +
        `Processing: ${status.isConsuming}, ` +
        `Messages: ${metrics.messagesProcessed}, ` +
        `Errors: ${metrics.totalErrors}, ` +
        `DLQ: ${metrics.dlqMessageCount}`);
      
      // Alert on high error rate
      if (metrics.errorRate > 10) {
        console.warn(`⚠️ High error rate detected: ${metrics.errorRate}%`);
      }
      
      // Alert on DLQ buildup
      if (metrics.dlqMessageCount > 50) {
        console.warn(`⚠️ High DLQ message count: ${metrics.dlqMessageCount}`);
      }
    }
  }, config.healthCheckInterval);
}

/**
 * Setup graceful shutdown handlers
 */
function setupGracefulShutdown(): void {
  const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGUSR2'];
  
  signals.forEach(signal => {
    process.on(signal, async () => {
      console.log(`\n🔄 Received ${signal}, shutting down gracefully...`);
      await stopConsumer();
      process.exit(0);
    });
  });
  
  // Handle uncaught exceptions
  process.on('uncaughtException', async (error) => {
    console.error('💥 Uncaught Exception:', error);
    await stopConsumer();
    process.exit(1);
  });
  
  process.on('unhandledRejection', async (reason) => {
    console.error('💥 Unhandled Rejection:', reason);
    await stopConsumer();
    process.exit(1);
  });
}

/**
 * Main execution
 */
async function main(): Promise<void> {
  console.log('📦 SnapMyFine Kafka Consumer Service v1.0.0');
  console.log('🔧 Environment:', process.env.NODE_ENV || 'development');
  
  // Setup graceful shutdown
  if (config.gracefulShutdown) {
    setupGracefulShutdown();
  }
  
  // Auto-start if configured
  if (config.autoStart) {
    await startConsumer();
  } else {
    console.log('⏸️ Auto-start disabled. Consumer service initialized but not started.');
    console.log('💡 Start the consumer via API: POST /api/kafka/consumer/status {"action": "start"}');
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  });
}

// Export for use in other modules
export { startConsumer, stopConsumer, consumerService };