import { NextRequest, NextResponse } from "next/server";
const gocardless = require('gocardless-nodejs');
const constants = require('gocardless-nodejs/constants');

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    if (!id) {
        return NextResponse.json({
            error: 'Missing required field: id',
        }, { status: 400 });
    }
        
    try {
        const client = gocardless(
            process.env.NEXT_GO_CARDLESS_ACCESS_TOKEN,
            process.env.NEXT_GO_CARDLESS_ENVIRONMENT === 'live' ? constants.Environments.Live : constants.Environments.Sandbox,
            { raiseOnIdempotencyConflict: true },
        );

        const resp = await client.billingRequests.find(id);

        return NextResponse.json({ billingRequest: resp }, { status: 200 });

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error("Unexpected error:", message);
        return NextResponse.json({
            error: message,
        }, { status: 500 });
    }
}
