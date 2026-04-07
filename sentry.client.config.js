import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_SENTRY_DSN,
  
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: true,

  replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  integrations: [
    Sentry.replayIntegration({
      // Additional Replay configuration goes in here, for example:
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  // Capture payment-related errors specifically
  beforeSend(event, hint) {
    // Add client context to all errors
    if (event.tags) {
      event.tags.environment = event.tags.environment || 'client';
    } else {
      event.tags = { environment: 'client' };
    }

    // Enhanced logging for payment-related errors
    if (event.exception?.values?.[0]?.value?.includes('payment') ||
        event.exception?.values?.[0]?.value?.includes('Payment') ||
        event.exception?.values?.[0]?.value?.includes('GoCardless') ||
        event.exception?.values?.[0]?.value?.includes('council') ||
        event.exception?.values?.[0]?.value?.includes('Council')) {
      console.log('Payment-related client error captured by Sentry:', event);
      event.tags.category = 'payment';
    }

    return event;
  },
});