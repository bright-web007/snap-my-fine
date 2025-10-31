import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const ticketApiUrl = process.env.NEXT_TICKET_PAYMENT_API_ENDPOINT!;
    console.log({ payload });

    const response = await fetch(ticketApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("Response status from ticket payment API:", response.status, response.statusText);

    // Check if response is successful before trying to parse
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Ticket payment API error:", errorText);
      return NextResponse.json(
        { error: "Ticket payment API returned error", details: errorText },
        { status: response.status }
      );
    }

    // Check content length to prevent memory issues
    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 10 * 1024 * 1024) { // 10MB limit
      console.error("Response too large:", contentLength, "bytes");
      return NextResponse.json(
        { error: "Response from ticket API is too large" },
        { status: 413 }
      );
    }

    // Try to parse JSON with timeout and error handling
    let result;
    try {
      const responseText = await response.text();
      console.log("Response text length:", responseText.length, "characters");
      
      // Log first 500 characters of response for debugging
      console.log("Response preview:", responseText.substring(0, 500));
      
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error("JSON parsing error:", parseError);
      return NextResponse.json(
        { error: "Failed to parse response from ticket API" },
        { status: 500 }
      );
    }

    console.log("Ticket payment API response parsed successfully");
    return NextResponse.json(result, { status: response.status });

  } catch (error) {
    console.error("Error forwarding to ticket payment API:", error);
    return NextResponse.json(
      { error: "Failed to process ticket confirmation" },
      { status: 500 },
    );
  }
}
