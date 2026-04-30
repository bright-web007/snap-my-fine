import { NextResponse } from 'next/server';

/**
 * GET /api/kafka/health
 * Health check endpoint for Kafka consumer service
 */
export async function GET() {
  try {
    // Check if required environment variables are set
    const requiredEnvVars = [
      'KAFKA_BROKERS',
      'KAFKA_CLIENT_ID',
      'KAFKA_GROUP_ID',
      'NEXT_HERACLES_ENDPOINT'
    ];

    const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

    if (missingEnvVars.length > 0) {
      return NextResponse.json(
        {
          success: false,
          status: 'unhealthy',
          message: 'Missing required environment variables',
          details: {
            missing_env_vars: missingEnvVars,
            kafka_brokers: process.env.KAFKA_BROKERS ? 'configured' : 'missing',
            heracles_endpoint: process.env.NEXT_HERACLES_ENDPOINT ? 'configured' : 'missing'
          }
        },
        { status: 503 }
      );
    }

    // Test Heracles connectivity
    let heraclesStatus = 'unknown';
    try {
      const heraclesResponse = await fetch(`${process.env.NEXT_HERACLES_ENDPOINT}/health`, {
        method: 'GET',
        timeout: 5000
      });
      heraclesStatus = heraclesResponse.ok ? 'healthy' : 'unhealthy';
    } catch {
      heraclesStatus = 'unreachable';
    }

    return NextResponse.json(
      {
        success: true,
        status: 'healthy',
        message: 'Kafka consumer service is ready',
        details: {
          service: 'snapmyfine-kafka-consumer',
          version: '1.0.0',
          environment: process.env.NODE_ENV || 'development',
          kafka_brokers: process.env.KAFKA_BROKERS,
          consumer_group: process.env.KAFKA_GROUP_ID,
          heracles_status: heraclesStatus,
          heracles_endpoint: process.env.NEXT_HERACLES_ENDPOINT,
          timestamp: new Date().toISOString()
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json(
      {
        success: false,
        status: 'unhealthy',
        message: 'Health check failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 503 }
    );
  }
}