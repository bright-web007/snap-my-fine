// route.ts - Fixed API route for /api/kafka/consumer/status
import { NextRequest, NextResponse } from 'next/server';
import { ConsumerStatusSchema } from '@/lib/schema';
import { 
  getConsumerService, 
  isServicesInitialized, 
  startConsumerAsync,
  shutdownServices, 
  restartServices 
} from '@/lib/services/startup';

/**
 * GET /api/kafka/consumer/status
 * Get current consumer status
 */
export async function GET() {
  try {
    const consumerInstance = getConsumerService();
    
    if (!consumerInstance) {
      return NextResponse.json(
        {
          success: true,
          message: 'Consumer not initialized',
          initialized: false,
          status: {
            isConnected: false,
            isConsuming: false,
            messagesProcessed: 0,
            errors: [],
            topics: [],
          }
        },
        { status: 200 }
      );
    }

    const status = consumerInstance.getStatus();
    
    // Validate status if schema is available
    let validatedStatus = status;
    try {
      validatedStatus = ConsumerStatusSchema.parse(status);
    } catch {
      // Schema validation failed, use raw status
      console.warn('Status schema validation failed, using raw status');
    }

    return NextResponse.json(
      {
        success: true,
        initialized: isServicesInitialized(),
        status: validatedStatus,
        message: 'Consumer status retrieved successfully'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error getting consumer status:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get consumer status'
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/kafka/consumer/status
 * Start, stop, or restart the consumer
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (!action || !['start', 'stop', 'restart'].includes(action)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid action. Must be "start", "stop", or "restart"'
        },
        { status: 400 }
      );
    }

    switch (action) {
      case 'start': {
        // Check if already running
        const existingConsumer = getConsumerService();
        if (existingConsumer?.getStatus().isConsuming) {
          return NextResponse.json(
            {
              success: false,
              message: 'Consumer is already running',
              status: existingConsumer.getStatus()
            },
            { status: 400 }
          );
        }

        // Start consumer asynchronously
        const result = await startConsumerAsync();
        
        // Wait a moment for initialization to progress
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const consumer = getConsumerService();
        
        return NextResponse.json(
          {
            success: result.success,
            message: result.message,
            status: consumer?.getStatus() || {}
          },
          { status: result.success ? 200 : 400 }
        );
      }

      case 'stop': {
        const consumerToStop = getConsumerService();
        if (!consumerToStop) {
          return NextResponse.json(
            {
              success: false,
              message: 'Consumer is not running'
            },
            { status: 400 }
          );
        }

        await shutdownServices();

        return NextResponse.json(
          {
            success: true,
            message: 'Consumer stopped successfully'
          },
          { status: 200 }
        );
      }

      case 'restart': {
        // Restart in background to avoid timeout
        restartServices().catch(error => {
          console.error('Error during restart:', error);
        });
        
        return NextResponse.json(
          {
            success: true,
            message: 'Consumer restart initiated. Check status in a few seconds.'
          },
          { status: 200 }
        );
      }

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
    console.error('Error managing consumer:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to manage consumer'
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/kafka/consumer/status
 * Clear consumer errors
 */
export async function DELETE() {
  try {
    const consumerInstance = getConsumerService();
    
    if (!consumerInstance) {
      return NextResponse.json(
        {
          success: false,
          message: 'Consumer not initialized'
        },
        { status: 400 }
      );
    }

    consumerInstance.clearErrors();

    return NextResponse.json(
      {
        success: true,
        message: 'Consumer errors cleared successfully'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error clearing consumer errors:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to clear consumer errors'
      },
      { status: 500 }
    );
  }
}
