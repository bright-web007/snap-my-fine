// app/api/test-connection/route.ts
import * as Sentry from "@sentry/nextjs";

export async function GET() {
    // Test Sentry error capture
    console.log('Testing Sentry error capture...');
    Sentry.captureException(new Error("Sentry test error from test-connection API"), {
        tags: {
            category: 'sentry_test',
            operation: 'test_error_capture'
        },
        extra: {
            testMessage: 'This is a test error to verify Sentry integration',
            timestamp: new Date().toISOString()
        }
    });
    console.log('Sentry test error sent');
    try {
        console.log('Testing TrueLayer connection...');
        
        // Test auth endpoint
        const authTest = await fetch('https://auth.truelayer-sandbox.com/connect/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: process.env.NEXT_TRUELAYER_CLIENT_ID!,
                client_secret: process.env.NEXT_TRUELAYER_CLIENT_SECRET!,
                scope: 'payments',
            }),
        });
        
        console.log('Auth endpoint status:', authTest.status);
        
        // Test API endpoint (should fail without proper auth, but proves connectivity)
        const apiTest = await fetch('https://api.truelayer-sandbox.com/v3/payments', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer test',
            },
        });
        
        console.log('API endpoint status:', apiTest.status);
        
        return Response.json({ 
            success: true,
            auth_reachable: authTest.ok,
            api_reachable: true,
        });
        
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        const cause = error instanceof Error && (error as any).cause instanceof Error ? (error as any).cause.message : undefined;
        return Response.json({ 
            success: false,
            error: message,
            cause,
        }, { status: 500 });
    }
}