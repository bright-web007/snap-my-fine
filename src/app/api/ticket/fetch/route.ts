import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    console.log("Received payload:", payload);

    // Get the n8n webhook URL from environment variables
    const n8nWebhookUrl = process.env.NEXT_N8N_WEBHOOK_ENDPOINT!;
    console.log("N8N webhook URL:", n8nWebhookUrl);

    if (!n8nWebhookUrl) {
      return NextResponse.json(
        { error: "N8N webhook endpoint not configured" },
        { status: 500 }
      );
    }

    // Call the n8n endpoint to fetch all saved tickets
    // Using axios to properly handle GET request with body
    const response = await axios({
      method: "GET",
      url: n8nWebhookUrl,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Axios response status:", response.status);
    console.log("N8N response data:", response.data);
    
    const result = response.data;

    // Return the fetched tickets
    // n8n returns the data directly as an array, not wrapped in a data property
    return NextResponse.json({
      success: true,
      data: Array.isArray(result) ? result : []
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching tickets:", error);
    return NextResponse.json(
      { error: "Failed to fetch tickets" },
      { status: 500 }
    );
  }
}
