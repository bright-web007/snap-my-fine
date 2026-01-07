import { NextRequest, NextResponse } from 'next/server';

// Import the global consumer instance
let globalConsumerInstance: any = null;

// This would be shared with the main status route in production
export function setGlobalConsumerInstance(instance: any) {
  globalConsumerInstance = instance;
}

/**
 * GET /api/kafka/metrics
 * Get detailed consumer metrics
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format'); // 'json' or 'prometheus'

    if (!globalConsumerInstance) {
      const emptyMetrics = {
        messagesProcessed: 0,
        messagesPerMinute: 0,
        averageProcessingTime: 0,
        totalErrors: 0,
        errorRate: 0,
        recentErrors: [],
        dlqMessageCount: 0,
        dlqRetryableCount: 0,
        dlqPermanentlyFailedCount: 0,
        uptime: 0,
        isHealthy: false,
        lastHeartbeat: new Date().toISOString(),
        topicStats: []
      };

      if (format === 'prometheus') {
        return new Response('# Consumer not initialized\n', {
          status: 200,
          headers: { 'Content-Type': 'text/plain' }
        });
      }

      return NextResponse.json(
        {
          success: false,
          message: 'Consumer not initialized',
          metrics: emptyMetrics
        },
        { status: 200 }
      );
    }

    if (format === 'prometheus') {
      const prometheusMetrics = globalConsumerInstance.exportPrometheusMetrics();
      return new Response(prometheusMetrics, {
        status: 200,
        headers: { 'Content-Type': 'text/plain' }
      });
    }

    // Default JSON format
    const metrics = globalConsumerInstance.getMetrics();
    const performanceHistory = globalConsumerInstance.getPerformanceHistory();

    return NextResponse.json(
      {
        success: true,
        metrics,
        performanceHistory,
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error getting metrics:', error);
    
    if (error instanceof Error && error.message.includes('prometheus')) {
      return new Response(`# Error getting metrics: ${error.message}\n`, {
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get metrics'
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/kafka/metrics
 * Reset metrics
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (!globalConsumerInstance) {
      return NextResponse.json(
        {
          success: false,
          message: 'Consumer not initialized'
        },
        { status: 400 }
      );
    }

    if (action === 'reset') {
      globalConsumerInstance.resetMetrics();
      
      return NextResponse.json(
        {
          success: true,
          message: 'Metrics reset successfully'
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Invalid action. Only "reset" is supported'
      },
      { status: 400 }
    );

  } catch (error) {
    console.error('Error managing metrics:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to manage metrics'
      },
      { status: 500 }
    );
  }
}