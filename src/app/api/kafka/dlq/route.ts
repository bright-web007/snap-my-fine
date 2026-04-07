import { NextRequest, NextResponse } from 'next/server';

// Import the global consumer instance from status route
// In a production app, you might want to use a proper service registry
let globalConsumerInstance: any = null;

// This is a temporary way to share the consumer instance
// In production, consider using Redis or a proper service mesh
export function setGlobalConsumerInstance(instance: any) {
  globalConsumerInstance = instance;
}

export function getGlobalConsumerInstance() {
  return globalConsumerInstance;
}

/**
 * GET /api/kafka/dlq
 * Get Dead Letter Queue statistics and failed messages
 */
export async function GET() {
  try {
    if (!globalConsumerInstance) {
      return NextResponse.json(
        {
          success: false,
          message: 'Consumer not initialized',
          stats: {
            totalMessages: 0,
            retryableMessages: 0,
            permanentlyFailed: 0,
            oldestMessage: null
          },
          failedMessages: []
        },
        { status: 200 }
      );
    }

    const stats = globalConsumerInstance.getDLQStats();
    const failedMessages = globalConsumerInstance.getFailedMessages();

    return NextResponse.json(
      {
        success: true,
        stats,
        failedMessages,
        message: `Found ${stats.totalMessages} messages in DLQ`
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error getting DLQ status:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get DLQ status'
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/kafka/dlq
 * Retry specific messages or perform DLQ operations
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, messageId } = body;

    if (!globalConsumerInstance) {
      return NextResponse.json(
        {
          success: false,
          message: 'Consumer not initialized'
        },
        { status: 400 }
      );
    }

    if (!action || !['retry', 'retryAll', 'clear'].includes(action)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid action. Must be "retry", "retryAll", or "clear"'
        },
        { status: 400 }
      );
    }

    switch (action) {
      case 'retry':
        if (!messageId) {
          return NextResponse.json(
            {
              success: false,
              error: 'messageId is required for retry action'
            },
            { status: 400 }
          );
        }

        const retryResult = await globalConsumerInstance.retryMessage(messageId);
        
        return NextResponse.json(
          {
            success: retryResult,
            message: retryResult 
              ? `Successfully retried message ${messageId}`
              : `Failed to retry message ${messageId}`
          },
          { status: retryResult ? 200 : 400 }
        );

      case 'retryAll':
        const failedMessages = globalConsumerInstance.getFailedMessages();
        const retryableMessages = failedMessages.filter(msg => msg.attempts < msg.maxRetries);
        
        let successCount = 0;
        for (const message of retryableMessages) {
          try {
            const result = await globalConsumerInstance.retryMessage(message.id);
            if (result) successCount++;
          } catch (error) {
            console.error(`Failed to retry message ${message.id}:`, error);
          }
        }

        return NextResponse.json(
          {
            success: true,
            message: `Retried ${successCount}/${retryableMessages.length} messages`,
            results: {
              attempted: retryableMessages.length,
              successful: successCount,
              failed: retryableMessages.length - successCount
            }
          },
          { status: 200 }
        );

      case 'clear':
        globalConsumerInstance.clearDLQ();
        
        return NextResponse.json(
          {
            success: true,
            message: 'DLQ cleared successfully'
          },
          { status: 200 }
        );

      default:
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid action'
          },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Error managing DLQ:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to manage DLQ'
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/kafka/dlq
 * Clear all messages from DLQ
 */
export async function DELETE() {
  try {
    if (!globalConsumerInstance) {
      return NextResponse.json(
        {
          success: false,
          message: 'Consumer not initialized'
        },
        { status: 400 }
      );
    }

    const statsBeforeClear = globalConsumerInstance.getDLQStats();
    globalConsumerInstance.clearDLQ();

    return NextResponse.json(
      {
        success: true,
        message: `Cleared ${statsBeforeClear.totalMessages} messages from DLQ`
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error clearing DLQ:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to clear DLQ'
      },
      { status: 500 }
    );
  }
}