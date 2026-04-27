export interface FailedMessage {
  id: string;
  topic: string;
  partition: number;
  offset: string;
  timestamp: string;
  attempts: number;
  maxRetries: number;
  originalMessage: any;
  errors: string[];
  lastAttemptAt: string;
  nextRetryAt?: string;
}

export class DeadLetterQueueService {
  private failedMessages: Map<string, FailedMessage> = new Map();
  private readonly maxRetries: number;
  private readonly retryDelayMs: number;
  private readonly maxRetryDelayMs: number;

  constructor(
    maxRetries: number = 3,
    retryDelayMs: number = 5000, // 5 seconds
    maxRetryDelayMs: number = 300000 // 5 minutes
  ) {
    this.maxRetries = maxRetries;
    this.retryDelayMs = retryDelayMs;
    this.maxRetryDelayMs = maxRetryDelayMs;
  }

  /**
   * Add a failed message to the DLQ
   */
  async addFailedMessage(
    topic: string,
    partition: number,
    offset: string,
    message: any,
    error: Error
  ): Promise<void> {
    const messageId = `${topic}-${partition}-${offset}`;
    const now = new Date().toISOString();

    let failedMessage = this.failedMessages.get(messageId);

    if (!failedMessage) {
      // First failure
      failedMessage = {
        id: messageId,
        topic,
        partition,
        offset,
        timestamp: now,
        attempts: 1,
        maxRetries: this.maxRetries,
        originalMessage: message,
        errors: [error.message],
        lastAttemptAt: now,
        nextRetryAt: this.calculateNextRetryTime(1)
      };
    } else {
      // Subsequent failure
      failedMessage.attempts += 1;
      failedMessage.errors.push(error.message);
      failedMessage.lastAttemptAt = now;
      failedMessage.nextRetryAt = failedMessage.attempts < this.maxRetries 
        ? this.calculateNextRetryTime(failedMessage.attempts)
        : undefined;
    }

    this.failedMessages.set(messageId, failedMessage);

    console.log(`📝 Added message to DLQ: ${messageId} (attempt ${failedMessage.attempts}/${this.maxRetries})`);

    // Log to external monitoring service if needed
    await this.logFailedMessage(failedMessage, error);
  }

  /**
   * Get messages ready for retry
   */
  getMessagesForRetry(): FailedMessage[] {
    const now = new Date();
    
    return Array.from(this.failedMessages.values())
      .filter(msg => 
        msg.attempts < msg.maxRetries && 
        msg.nextRetryAt && 
        new Date(msg.nextRetryAt) <= now
      )
      .sort((a, b) => new Date(a.nextRetryAt!).getTime() - new Date(b.nextRetryAt!).getTime());
  }

  /**
   * Get permanently failed messages (exceeded max retries)
   */
  getPermanentlyFailedMessages(): FailedMessage[] {
    return Array.from(this.failedMessages.values())
      .filter(msg => msg.attempts >= msg.maxRetries);
  }

  /**
   * Get all messages in DLQ
   */
  getAllFailedMessages(): FailedMessage[] {
    return Array.from(this.failedMessages.values());
  }

  /**
   * Remove a message from DLQ (after successful retry)
   */
  removeMessage(messageId: string): void {
    this.failedMessages.delete(messageId);
    console.log(`✅ Removed message from DLQ: ${messageId}`);
  }

  /**
   * Clear all messages from DLQ
   */
  clearAll(): void {
    const count = this.failedMessages.size;
    this.failedMessages.clear();
    console.log(`🗑️ Cleared ${count} messages from DLQ`);
  }

  /**
   * Get DLQ statistics
   */
  getStats() {
    const messages = Array.from(this.failedMessages.values());
    const retryableMessages = messages.filter(msg => msg.attempts < msg.maxRetries);
    const permanentlyFailed = messages.filter(msg => msg.attempts >= msg.maxRetries);

    return {
      totalMessages: messages.length,
      retryableMessages: retryableMessages.length,
      permanentlyFailed: permanentlyFailed.length,
      oldestMessage: messages.length > 0 
        ? messages.reduce((oldest, current) => 
            new Date(current.timestamp) < new Date(oldest.timestamp) ? current : oldest
          ).timestamp
        : null
    };
  }

  /**
   * Calculate next retry time with exponential backoff
   */
  private calculateNextRetryTime(attempt: number): string {
    const delay = Math.min(
      this.retryDelayMs * Math.pow(2, attempt - 1), // Exponential backoff
      this.maxRetryDelayMs
    );
    
    return new Date(Date.now() + delay).toISOString();
  }

  /**
   * Log failed message to external monitoring service
   */
  private async logFailedMessage(failedMessage: FailedMessage, error: Error): Promise<void> {
    try {
      // In production, this could send to Sentry, DataDog, etc.
      console.error(`🚨 Message failed processing:`, {
        messageId: failedMessage.id,
        topic: failedMessage.topic,
        attempt: failedMessage.attempts,
        maxRetries: failedMessage.maxRetries,
        error: error.message,
        nextRetry: failedMessage.nextRetryAt
      });
      
      // Example: Send to Sentry
      // Sentry.captureException(error, {
      //   tags: {
      //     component: 'kafka-consumer',
      //     topic: failedMessage.topic
      //   },
      //   extra: {
      //     messageId: failedMessage.id,
      //     attempt: failedMessage.attempts,
      //     originalMessage: failedMessage.originalMessage
      //   }
      // });

    } catch (logError) {
      console.error('Failed to log DLQ message:', logError);
    }
  }

  /**
   * Manually retry a specific message
   */
  async retryMessage(messageId: string, retryFunction: (message: any) => Promise<void>): Promise<boolean> {
    const failedMessage = this.failedMessages.get(messageId);
    
    if (!failedMessage) {
      console.warn(`Message not found in DLQ: ${messageId}`);
      return false;
    }

    if (failedMessage.attempts >= failedMessage.maxRetries) {
      console.warn(`Message exceeded max retries: ${messageId}`);
      return false;
    }

    try {
      console.log(`🔄 Manually retrying message: ${messageId}`);
      await retryFunction(failedMessage.originalMessage);
      this.removeMessage(messageId);
      return true;
    } catch (error) {
      await this.addFailedMessage(
        failedMessage.topic,
        failedMessage.partition,
        failedMessage.offset,
        failedMessage.originalMessage,
        error as Error
      );
      return false;
    }
  }
}