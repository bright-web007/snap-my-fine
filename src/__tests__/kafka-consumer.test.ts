/**
 * Basic validation test for Kafka Consumer implementation
 */

import { KafkaConsumerService } from '../src/lib/services/kafka-consumer';
import { FineReminderEventSchema } from '../src/lib/schema';

// Mock environment variables for testing
process.env.KAFKA_BROKERS = 'localhost:9092';
process.env.KAFKA_CLIENT_ID = 'test-consumer';
process.env.KAFKA_GROUP_ID = 'test-group';
process.env.NEXT_HERACLES_ENDPOINT = 'http://localhost:4055';

describe('Kafka Consumer Service', () => {
  let consumerService: KafkaConsumerService;

  beforeEach(() => {
    consumerService = new KafkaConsumerService();
  });

  afterEach(async () => {
    if (consumerService) {
      try {
        await consumerService.disconnect();
      } catch {
        // Ignore cleanup errors in tests
      }
    }
  });

  test('should initialize without errors', () => {
    expect(consumerService).toBeDefined();
    expect(consumerService.getStatus).toBeDefined();
    expect(consumerService.connect).toBeDefined();
  });

  test('should return proper initial status', () => {
    const status = consumerService.getStatus();
    
    expect(status.isConnected).toBe(false);
    expect(status.isConsuming).toBe(false);
    expect(status.messagesProcessed).toBe(0);
    expect(status.topics).toHaveLength(9);
    expect(status.topics).toContain('fine.discount.week_left');
    expect(status.topics).toContain('fine.enforcement.overdue');
  });

  test('should validate message schema correctly', () => {
    const validMessage = {
      user_email: 'test@example.com',
      council: 'Westminster',
      pcn_number: 'TEST123456',
      plate_number: 'AB12CDE',
      amount: 60,
      event_type: 'fine.discount.week_left',
      project_uuid: 'HIVEDECK'
    };

    const result = FineReminderEventSchema.safeParse(validMessage);
    expect(result.success).toBe(true);
  });

  test('should reject invalid message schema', () => {
    const invalidMessage = {
      user_email: 'invalid-email',
      council: '',
      // missing required fields
      event_type: 'invalid-event-type'
    };

    const result = FineReminderEventSchema.safeParse(invalidMessage);
    expect(result.success).toBe(false);
  });

  test('should have proper DLQ integration', () => {
    const status = consumerService.getStatus();
    
    expect(status.dlq).toBeDefined();
    expect(status.dlq.totalMessages).toBe(0);
    expect(status.dlq.retryableMessages).toBe(0);
    expect(status.dlq.permanentlyFailed).toBe(0);
  });

  test('should have metrics collection', () => {
    const metrics = consumerService.getMetrics();
    
    expect(metrics).toBeDefined();
    expect(metrics.messagesProcessed).toBe(0);
    expect(metrics.totalErrors).toBe(0);
    expect(metrics.isHealthy).toBeDefined();
    expect(metrics.topicStats).toHaveLength(9);
  });

  test('should support Prometheus metrics export', () => {
    const prometheusMetrics = consumerService.exportPrometheusMetrics();
    
    expect(prometheusMetrics).toBeDefined();
    expect(typeof prometheusMetrics).toBe('string');
    expect(prometheusMetrics).toContain('kafka_consumer_messages_processed_total');
    expect(prometheusMetrics).toContain('kafka_consumer_errors_total');
  });
});

describe('Fine Reminder Event Schema', () => {
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

  test('should accept all valid topic types', () => {
    topics.forEach(topic => {
      const message = {
        user_email: 'test@example.com',
        council: 'Test Council',
        pcn_number: 'TEST123',
        plate_number: 'TEST123',
        amount: 60,
        event_type: topic
      };

      const result = FineReminderEventSchema.safeParse(message);
      expect(result.success).toBe(true);
    });
  });

  test('should validate required fields', () => {
    const requiredFields = ['user_email', 'council', 'pcn_number', 'plate_number', 'amount', 'event_type'];
    
    requiredFields.forEach(field => {
      const message = {
        user_email: 'test@example.com',
        council: 'Test Council',
        pcn_number: 'TEST123',
        plate_number: 'TEST123',
        amount: 60,
        event_type: 'fine.discount.week_left'
      };

      delete message[field as keyof typeof message];
      
      const result = FineReminderEventSchema.safeParse(message);
      expect(result.success).toBe(false);
    });
  });
});

// Integration test helper
export async function createTestMessage(topic: string, overrides: any = {}) {
  return {
    user_email: 'test@example.com',
    council: 'Test Council',
    council_name: 'Test Council Full Name',
    pcn_number: 'TEST123456',
    plate_number: 'AB12CDE',
    amount: 60,
    discount_amount: 20,
    discount_expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    service_date_notice: new Date().toISOString(),
    timestamp: new Date().toISOString(),
    project_uuid: 'HIVEDECK',
    event_type: topic,
    ...overrides
  };
}

// Mock Kafka message helper
export function createMockKafkaMessage(topic: string, data: any) {
  return {
    topic,
    partition: 0,
    offset: '12345',
    timestamp: Date.now().toString(),
    key: Buffer.from('test-key'),
    value: Buffer.from(JSON.stringify(data)),
    headers: {}
  };
}