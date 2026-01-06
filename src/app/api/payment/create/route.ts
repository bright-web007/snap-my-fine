import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { randomUUID } from "crypto";
import * as gocardless from 'gocardless-nodejs';
import * as constants from 'gocardless-nodejs/constants';

export async function POST(req: NextRequest) {

    const referenceId = `pcn-${Date.now()}-${Math.floor(Math.random() * 10000)}_${randomUUID()}`;

    const { amount, pcnNumber, vehicleReg, email, fullName, council } = await req.json();

    // Debug log to track what data is being received
    console.log('Payment creation request data:', {
        amount,
        pcnNumber,
        vehicleReg,
        email,
        fullName,
        council
    });

    if (!amount || !pcnNumber || !vehicleReg || !email || !fullName) {
        return NextResponse.json({
            error: 'Missing required fields: amount, pcnNumber, vehicleReg, email, fullName',
        }, { status: 400 });
    }

    if (fullName.length < 2 || fullName.length > 100) {
        return NextResponse.json({
            error: 'Full name must be between 2 and 100 characters',
        }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json({
            error: 'Invalid email format',
        }, { status: 400 });
    }

    try {

        const client = gocardless(
            process.env.NEXT_GO_CARDLESS_ACCESS_TOKEN,
            process.env.NEXT_GO_CARDLESS_ENVIRONMENT === 'live' ? constants.Environments.Live : constants.Environments.Sandbox,
            { raiseOnIdempotencyConflict: true },
        );

        const billingRequest = await client.billingRequests.create({
            payment_request: {
                description: "First Payment",
                amount: `${amount * 100}`,
                currency: "GBP",
                app_fee: `${5}.00`,
            },
        });

        const billingRequestFlow = await client.billingRequestFlows.create({
            redirect_uri: `${process.env.NEXT_GO_REDIRECT_URI!}?reference_id=${encodeURIComponent(referenceId)}`,
            exit_uri: process.env.NEXT_GO_EXIT_URI!,
            links: {
                billing_request: billingRequest.id,
            }
        });

        console.log('Payment creation successful - Payment ID:', billingRequest.id);
        console.log(billingRequestFlow)

        // Log the billing request flow details to n8n for storing the paymentId
        try {
            const n8nResponse = await fetch(process.env.NEXT_N8N_WEBHOOK_ENDPOINT!, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: 'payment_init',
                    data: {
                        referenceId,
                        email,
                        fine_id: pcnNumber, // Use PCN number as fine_id
                        linkPaymentId: billingRequest.id,
                        status: "pending",
                        total_amount: amount,
                        guestSessionId: null,
                        paymentProvider: "gocardless",
                        bank_authorisation: null,
                        payment_timestamp: null
                    }
                }),
            });

            if (!n8nResponse.ok) {
                throw new Error(`N8N webhook failed with status: ${n8nResponse.status}`);
            }

            console.log('N8N webhook sent successfully');
        } catch (n8nError) {
            console.error('N8N webhook error:', n8nError);
            
            // Capture N8N webhook errors with Sentry
            Sentry.captureException(n8nError, {
                tags: {
                    category: 'webhook',
                    operation: 'n8n_payment_init',
                    council: council || 'unknown'
                },
                extra: {
                    referenceId,
                    pcnNumber,
                    amount,
                    billingRequestId: billingRequest.id
                }
            });
            
            // Continue execution even if N8N webhook fails
            // The payment creation should not fail because of webhook issues
        }

        return NextResponse.json({
            billingRequestFlow,
            paymentId: billingRequest.id
        }, { status: 200 });

    } catch (error: unknown) {
        const genericMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error("Payment creation error:", genericMessage);

        // Capture payment creation errors with Sentry
        Sentry.captureException(error, {
            tags: {
                category: 'payment',
                operation: 'create_payment',
                council: council || 'unknown'
            },
            extra: {
                amount,
                pcnNumber,
                vehicleReg,
                email: email.substring(0, 3) + '***', // Partial email for privacy
                council
            }
        });

        return NextResponse.json({
            error: genericMessage,
        }, { status: 500 });
    }
}
