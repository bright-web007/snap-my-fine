import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

export async function POST(req: NextRequest) {
    try {
        const { referenceId } = await req.json();

        if (!referenceId) {
            return NextResponse.json({
                error: 'Missing required field: referenceId',
            }, { status: 400 });
        }

        // Make request to N8N webhook to get payment by reference ID
        const n8nResponse = await fetch(process.env.NEXT_N8N_WEBHOOK_ENDPOINT!, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: 'payment_get',
                data: {
                    referenceId
                }
            }),
        });

        if (!n8nResponse.ok) {
            const errorText = await n8nResponse.text();
            throw new Error(`N8N webhook failed with status: ${n8nResponse.status}, response: ${errorText}`);
        }

        const n8nResult = await n8nResponse.json();
        
        // Extract paymentId from N8N response - it's the link_payment_id field
        const paymentId = n8nResult?.link_payment_id;
        
        if (!paymentId) {
            throw new Error('Payment ID not found in N8N response');
        }

        console.log('Payment lookup successful - Payment ID:', paymentId);

        return NextResponse.json({
            success: true,
            paymentId,
            data: n8nResult
        }, { status: 200 });

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error("Payment lookup error:", errorMessage);

        // Capture payment lookup errors with Sentry
        Sentry.captureException(error, {
            tags: {
                category: 'payment',
                operation: 'payment_lookup',
            },
            extra: {
                endpoint: '/api/payment/lookup',
                errorMessage
            }
        });

        return NextResponse.json({
            error: errorMessage,
            operation: 'payment_lookup'
        }, { status: 500 });
    }
}