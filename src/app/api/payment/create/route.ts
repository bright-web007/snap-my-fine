import { NextRequest, NextResponse } from "next/server";
import * as tlSigning from 'truelayer-signing';
import axios, { AxiosError } from "axios";
import crypto from "crypto";

export async function POST(req: NextRequest) {

    const { amount, pcnNumber, vehicleReg } = await req.json();
    try {
        // Step 1: Get access token
        console.log("📡 Getting access token...");
        const tokenResponse = await axios.post(
            'https://auth.truelayer-sandbox.com/connect/token',
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

        // Step 2: Create payment
        const paymentBody = {
            "currency": "GBP",
            "amount_in_minor": 100,
            "payment_method": {
                "type": "bank_transfer",
                "provider_selection": {
                    "type": "user_selected",
                    "filter": {
                        "countries": [
                            "GB"
                        ],
                    }
                },
                "beneficiary": {
                    "type": "merchant_account",
                    "merchant_account_id": process.env.NEXT_TRUELAYER_MERCHANT_ACCOUNT_ID!
                }
            },
            "user": {
                "id": "f9b48c9d-176b-46dd-b2da-fe1a2b77350c",
                "email": "test@gmail.com",
                "name": "Test User"
            },
            "hosted_page": {
                "return_uri": "https://console.truelayer.com/redirect-page"
            },
            "metadata": {
                "vehicle_number": "test"
            },
        };

        const idempotencyKey = crypto.randomUUID();
        const bodyString = JSON.stringify(paymentBody);

        console.log("🔐 Signing request...");
        console.log("Body length:", bodyString.length);

        // Step 3: Sign the request
        const signature = tlSigning.sign({
            kid: process.env.NEXT_TRUELAYER_KID!,
            privateKeyPem: process.env.NEXT_PRIVATE_KEY_PEM!,
            method: 'POST',
            path: '/v3/payments',
            headers: {
                'Idempotency-Key': idempotencyKey,
            },
            body: bodyString,
        });

        console.log("✅ Request signed");
        console.log("Signature length:", signature.length);

        // Step 4: Send create payment request
        console.log("💳 Creating payment...");

        const paymentResponse = await axios.request({
            method: 'POST',
            url: 'https://api.truelayer-sandbox.com/v3/payments',
            data: bodyString,
            headers: {
                accept: 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json; charset=UTF-8',
                'Idempotency-Key': idempotencyKey,
                'Tl-Signature': signature,
            }
        })

        console.log("✅ Payment created successfully!");
        console.log("Payment ID:", paymentResponse.data.id);

        const payment = paymentResponse.data;
        console.log("Payment Details:", JSON.stringify(payment, null, 2));

        return NextResponse.json({
            payment_id: payment.id,
            authorization_url: payment.hosted_page?.uri,
            status: payment.status,
        }, { status: 200 });

    } catch (error: any) {
        console.error("❌ Payment Error");

        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;

            if (axiosError.response) {
                // TrueLayer returned an error
                console.error("Status:", axiosError.response.status);
                console.error("Response:", JSON.stringify(axiosError.response.data, null, 2));

                return NextResponse.json({
                    error: 'TrueLayer API error',
                    status: axiosError.response.status,
                    details: axiosError.response.data,
                }, { status: axiosError.response.status });
            } else if (axiosError.request) {
                // Request made but no response
                console.error("No response received");
                console.error("Error code:", axiosError.code);

                return NextResponse.json({
                    error: 'No response from TrueLayer',
                    code: axiosError.code,
                    message: axiosError.message,
                }, { status: 500 });
            }
        }

        // Other errors
        console.error("Unexpected error:", error.message);
        return NextResponse.json({
            error: error.message,
        }, { status: 500 });
    }
}
