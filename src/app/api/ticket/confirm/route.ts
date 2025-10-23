import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const ticketApiUrl = process.env.NEXT_TICKET_CONFIRMATION_API_ENDPOINT!;
    console.log({ payload });

    const response = await fetch(ticketApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("Response status from ticket confirmation API:", {response});

    const result = await response.json();
    
    // Always return the result with 200 status if we got a response, 
    // let the client handle success/error based on the result.success field
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error forwarding to ticket confirmation API:", error);
    
    // Capture ticket confirmation errors with Sentry
    Sentry.captureException(error, {
      tags: {
        category: 'council_integration',
        operation: 'confirm_ticket_api',
        api_route: '/api/ticket/confirm'
      },
      extra: {
        ticketApiUrl: process.env.NEXT_TICKET_CONFIRMATION_API_ENDPOINT,
        //@ts-ignore
        error: error?.message || error
      }
    });
    
    return NextResponse.json(
      { error: "Failed to process ticket confirmation" },
      { status: 500 },
    );
  }
}
