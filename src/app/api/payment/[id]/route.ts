import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id') || '';

    console.log(`🚀 Fetching payment details for ID: ${id}`);

    try {
        console.log("📡 Getting access token...");
        const tokenResponse = await axios.post(
            process.env.NEXT_TRUELAYER_AUTH_URL! + '/connect/token',
            new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: process.env.NEXT_TRUELAYER_CLIENT_ID!,
                client_secret: process.env.NEXT_TRUELAYER_CLIENT_SECRET!,
                scope: 'payments',
            }),
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                timeout: 30000,
            }
        );
        const { access_token } = tokenResponse.data;
        console.log("✅ Access token obtained");

        const options = {
            method: 'GET',
            url: process.env.NEXT_TRUELAYER_API_BASE_URL + '/v3/payments/' + id,
            headers: { accept: 'application/json; charset=UTF-8', authorization: 'Bearer ' + access_token }
        };

        const paymentResponse = await axios.request(options);
        console.log("✅ Payment details obtained");

        return NextResponse.json(paymentResponse.data, { status: 200 });

    } catch (error: any) {
        console.error("Unexpected error:", error.message);
        return NextResponse.json({
            error: error.message,
        }, { status: 500 });
    }
}
