import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: true,

  // Capture payment-related errors specifically
  beforeSend(event, hint) {
    // Add edge context to all errors
    if (event.tags) {
      event.tags.environment = event.tags.environment || 'edge';
    } else {
      event.tags = { environment: 'edge' };
    }

    // Enhanced logging for payment-related errors
    if (event.exception?.values?.[0]?.value?.includes('payment') ||
        event.exception?.values?.[0]?.value?.includes('Payment') ||
        event.exception?.values?.[0]?.value?.includes('GoCardless') ||
        event.exception?.values?.[0]?.value?.includes('council') ||
        event.exception?.values?.[0]?.value?.includes('Council')) {
      console.log('Payment-related edge error captured by Sentry:', event);
      event.tags.category = 'payment';
    }

    return event;
  },
});