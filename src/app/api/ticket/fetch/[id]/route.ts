import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    // Get the n8n webhook URL from environment variables
    const n8nWebhookUrl = process.env.NEXT_N8N_WEBHOOK_ENDPOINT!;
    if (!n8nWebhookUrl) {
      return NextResponse.json(
        { error: "N8N webhook endpoint not configured" },
        { status: 500 }
      );
    }

    // Call the n8n endpoint to fetch the specific ticket
    const response = await fetch(n8nWebhookUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error from n8n:", errorText);
      return NextResponse.json(
        { error: `Failed to fetch ticket from n8n: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const result = await response.json();

    // Return the fetched ticket
    return NextResponse.json({
      success: true,
      data: result.data || null
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching ticket:", error);
    return NextResponse.json(
      { error: "Failed to fetch ticket" },
      { status: 500 }
    );
  }
}
