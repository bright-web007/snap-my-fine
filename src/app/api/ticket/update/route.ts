import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const n8nWebhookUrl = process.env.NEXT_N8N_WEBHOOK_ENDPOINT!;
    console.log({ n8nWebhookUrl });
    console.log({ payload });

    const response = await fetch(n8nWebhookUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    return NextResponse.json(result, { status: response.status });
  } catch (error) {
    console.error("Error forwarding to n8n:", error);
    return NextResponse.json(
      { error: "Failed to process ticket" },
      { status: 500 },
    );
  }
}
