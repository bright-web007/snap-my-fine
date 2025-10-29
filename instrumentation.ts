export async function register() {
  const { init } = await import('@sentry/nextjs');
  init({
    dsn: process.env.NEXT_SENTRY_DSN,
    tracesSampleRate: 1.0,
    debug: false,
  });
  // if (process.env.NEXT_RUNTIME === 'nodejs') {
  // }
}