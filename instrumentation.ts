export async function register() {
  // Initialize Sentry
  const { init } = await import('@sentry/nextjs');
  init({
    dsn: process.env.NEXT_SENTRY_DSN,
    tracesSampleRate: 1.0,
    debug: false,
  });

  // Only run Kafka initialization on the server side (not during build or on edge runtime)
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.log('🚀 [Instrumentation] Next.js server starting...');
    
    // Dynamically import to avoid issues during build
    const { initializeKafkaConsumer } = await import('./src/lib/services/startup');
    
    try {
      await initializeKafkaConsumer();
      console.log('✅ [Instrumentation] Kafka consumer initialized successfully');
    } catch (error) {
      console.error('❌ [Instrumentation] Failed to initialize Kafka consumer:', error);
      // Don't throw - let the server start even if Kafka fails
      // The consumer can be started manually via API
    }
  }
}