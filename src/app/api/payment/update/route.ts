import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

export async function POST(req: NextRequest) {
    try {
        const { referenceId, billingRequestData } = await req.json();

        if (!referenceId || !billingRequestData) {
            return NextResponse.json({
                error: 'Missing required fields: referenceId and billingRequestData',
            }, { status: 400 });
        }

        // Send updated payment data to N8N webhook - populate missing values on the same payment_init payload
        const n8nResponse = await fetch(process.env.NEXT_N8N_WEBHOOK_ENDPOINT!, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: 'payment_init',
                data: {
                    referenceId,
                    fine_id: referenceId.split('_')[0] || '', // Extract PCN part from reference ID
                    linkPaymentId: billingRequestData.id,
                    status: billingRequestData.status || 'pending',
                    total_amount: billingRequestData.payment_request?.amount || 0, // Keep in pence as received
                    guestSessionId: null,
                    paymentProvider: "gocardless",
                    bank_authorisation: billingRequestData.links?.bank_authorisation || null,
                    payment_timestamp: billingRequestData.created_at || new Date().toISOString()
                }
            }),
        });

        if (!n8nResponse.ok) {
            const errorText = await n8nResponse.text();
            throw new Error(`N8N webhook failed with status: ${n8nResponse.status}, response: ${errorText}`);
        }

        const n8nResult = await n8nResponse.json();
        console.log('Payment update sent to N8N successfully');

        return NextResponse.json({
            success: true,
            message: 'Payment updated successfully',
            data: n8nResult
        }, { status: 200 });

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error("Payment update error:", errorMessage);

        // Capture payment update errors with Sentry
        Sentry.captureException(error, {
            tags: {
                category: 'payment',
                operation: 'payment_update',
            },
            extra: {
                endpoint: '/api/payment/update',
                errorMessage
            }
        });

        return NextResponse.json({
            error: errorMessage,
            operation: 'payment_update'
        }, { status: 500 });
    }
}