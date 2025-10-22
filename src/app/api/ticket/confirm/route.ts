import { NextRequest, NextResponse } from "next/server";

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

    const result = await response.json();
    return NextResponse.json(result, { status: response.status });
  } catch (error) {
    console.error("Error forwarding to ticket confirmation API:", error);
    return NextResponse.json(
      { error: "Failed to process ticket confirmation" },
      { status: 500 },
    );
  }
}
