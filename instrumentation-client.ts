// export async function register() {
//   if (process.env.NEXT_RUNTIME === 'nodejs') {
//     const { init } = await import('@sentry/nextjs');
//     console.log('Initializing Sentry with DSN:', process.env.NEXT_SENTRY_DSN);
//     init({
//       dsn: process.env.NEXT_SENTRY_DSN,
//       tracesSampleRate: 1.0,
//       debug: true, // Enable debug temporarily
//     });
//     console.log('Sentry initialized successfully');
//   }
// }

// // Simple approach - just capture the exception directly
// export async function onRequestError(
//   err: unknown, 
//   request: { url: string; method: string }
// ) {
//   const { captureException } = await import('@sentry/nextjs');
//   captureException(err, {
//     tags: {
//       section: 'request_error',
//       url: request.url,
//       method: request.method,
//     }
//   });
// }

import * as Sentry from "@sentry/nextjs";
Sentry.init({
  dsn: process.env.NEXT_SENTRY_DSN!,
  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
});