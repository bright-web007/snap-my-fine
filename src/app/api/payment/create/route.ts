import { NextRequest, NextResponse } from "next/server";
// import * as gocardless from 'gocardless-nodejs';
// import * as constants from 'gocardless-nodejs/constants';
const gocardless = require('gocardless-nodejs');
const constants = require('gocardless-nodejs/constants');

export async function POST(req: NextRequest) {

    const { amount, pcnNumber, vehicleReg, email, fullName } = await req.json();

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

        const billingRequestFlow = await client.billingRequestFlows.create({
            redirect_uri: process.env.NEXT_GO_REDIRECT_URI!,
            exit_uri: process.env.NEXT_GO_EXIT_URI!,
            links: {
                billing_request: billingRequest.id,
            }
        });

        return NextResponse.json({ billingRequestFlow }, { status: 200 });

    } catch (error: unknown) {
        const genericMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error("Unexpected error:", genericMessage);
        return NextResponse.json({
            error: genericMessage,
        }, { status: 500 });
    }
}
