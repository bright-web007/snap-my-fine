import { NextRequest, NextResponse } from "next/server";
import { TicketResponse } from "@/lib/schema";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    console.log({ payload });

    // Prepare the payload for Heracles /ticket endpoint
    const heraclesPayload: TicketResponse = { ...payload };

    // Get Heracles service URL from environment variables
    const heraclesUrl = process.env.NEXT_HERACLES_ENDPOINT!;

    const response = await fetch(`${heraclesUrl}/ticket/payment/reminder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(heraclesPayload),
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: result.message || "Failed to send fine reminder email",
        },
        { status: response.status },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: result.message || "Fine reminder email queued for processing",
        emailSentTo: heraclesPayload.email,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending fine reminder email:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to send fine reminder email",
      },
      { status: 500 },
    );
  }
}