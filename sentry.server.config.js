import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Add transport options for better error handling
  transport: {
    bufferSize: 100,
    flushTimeout: 10000,
  },

  // Capture payment-related errors specifically
  beforeSend(event, hint) {
    // Add server context to all errors
    if (event.tags) {
      event.tags.environment = event.tags.environment || 'server';
    } else {
      event.tags = { environment: 'server' };
    }

    // Enhanced logging for API route errors
    if (event.request?.url?.includes('/api/')) {
      console.log('API route error captured by Sentry:', event);
      event.tags.api_route = 'true';
    }

    // Enhanced logging for payment-related errors
    if (event.exception?.values?.[0]?.value?.includes('payment') ||
        event.exception?.values?.[0]?.value?.includes('Payment') ||
        event.exception?.values?.[0]?.value?.includes('GoCardless') ||
        event.exception?.values?.[0]?.value?.includes('council') ||
        event.exception?.values?.[0]?.value?.includes('Council')) {
      console.log('Payment-related server error captured by Sentry:', event);
      event.tags.category = 'payment';
    }

    return event;
  },
});