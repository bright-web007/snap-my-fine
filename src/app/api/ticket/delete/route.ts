import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    const payload = await request.json();

    // Validate required fields in nested structure
    if (!payload.data?.pcn_number) {
      return NextResponse.json(
        { error: "PCN Number is required" },
        { status: 400 },
      );
    }

    if (!payload.data?.email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 },
      );
    }

    // Get the n8n webhook URL from environment variables
    const n8nWebhookUrl = process.env.NEXT_N8N_WEBHOOK_ENDPOINT!;
    if (!n8nWebhookUrl) {
      return NextResponse.json(
        { error: "N8N webhook endpoint not configured" },
        { status: 500 },
      );
    }

    // Call the n8n endpoint to delete the specific ticket
    const response = await fetch(n8nWebhookUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error from n8n:", errorText);
      return NextResponse.json(
        {
          error: `Failed to delete ticket from n8n: ${response.status} ${response.statusText}`,
        },
        { status: response.status },
      );
    }

    const result = await response.json();

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Ticket deleted successfully",
        data: result.data || null,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting ticket:", error);
    return NextResponse.json(
      { error: "Failed to delete ticket" },
      { status: 500 },
    );
  }
}
