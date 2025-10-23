import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
// import * as gocardless from 'gocardless-nodejs';
// import * as constants from 'gocardless-nodejs/constants';
const gocardless = require('gocardless-nodejs');
const constants = require('gocardless-nodejs/constants');

export async function POST(req: NextRequest) {

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
                amount: `${amount}`,
                currency: "GBP",
                app_fee: `${5}.00`,
            },
        });

        // Build redirect URI with ticket data as query parameters
        const redirectUri = new URL(process.env.NEXT_GO_REDIRECT_URI!);
        redirectUri.searchParams.set('pcn_number', pcnNumber);
        redirectUri.searchParams.set('vehicle_number', vehicleReg);
        redirectUri.searchParams.set('amount', amount);
        redirectUri.searchParams.set('payment_id', billingRequest.id);
        if (council) {
            redirectUri.searchParams.set('council', council);
        }

        const billingRequestFlow = await client.billingRequestFlows.create({
            redirect_uri: redirectUri.toString(),
            exit_uri: process.env.NEXT_GO_EXIT_URI!,
            links: {
                billing_request: billingRequest.id,
            }
        });

        console.log('Payment creation successful - Payment ID:', billingRequest.id);
        
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
