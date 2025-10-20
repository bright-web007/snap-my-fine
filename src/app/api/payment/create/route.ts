import { NextRequest, NextResponse } from "next/server";
import * as tlSigning from 'truelayer-signing';
import axios, { AxiosError } from "axios";
import crypto from "crypto";

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

        let actualAmount: number | undefined = amount ? parseInt(amount, 10) : undefined;

        if (actualAmount === undefined) {
            throw new Error("Invalid amount provided");
        }

        const serviceFee = 5.00; // Example service fee
        const totalAmount = actualAmount + serviceFee;  // 50 + 5 = 55.00
        console.log(`💰 Total amount to charge (including service fee): £${totalAmount.toFixed(2)}`);
        actualAmount = totalAmount * 100;  // Convert to minor units

        console.log("📝 Preparing payment request...");
        const paymentBody = {
            "currency": "GBP",
            "amount_in_minor": actualAmount,
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
                "email": email,
                "name": fullName
            },
            "hosted_page": {
                "return_uri": "https://console.truelayer.com/redirect-page"
            },
            "metadata": {
                "vehicle_number": vehicleReg,
                "pcn_number": pcnNumber
            }
        };

        const idempotencyKey = crypto.randomUUID();
        const bodyString = JSON.stringify(paymentBody);

        console.log("🔐 Signing request...");
        console.log("Body length:", bodyString.length);

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

        console.log("💳 Creating payment...");

        const paymentResponse = await axios.request({
            method: 'POST',
            url: process.env.NEXT_TRUELAYER_API_BASE_URL! + '/v3/payments',
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
                console.error("Status:", axiosError.response.status);
                console.error("Response:", JSON.stringify(axiosError.response.data, null, 2));

                return NextResponse.json({
                    error: 'TrueLayer API error',
                    status: axiosError.response.status,
                    details: axiosError.response.data,
                }, { status: axiosError.response.status });
            } else if (axiosError.request) {
                console.error("No response received");
                console.error("Error code:", axiosError.code);

                return NextResponse.json({
                    error: 'No response from TrueLayer',
                    code: axiosError.code,
                    message: axiosError.message,
                }, { status: 500 });
            }
        }

        console.error("Unexpected error:", error.message);
        return NextResponse.json({
            error: error.message,
        }, { status: 500 });
    }
}
