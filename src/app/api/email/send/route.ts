import { NextRequest, NextResponse } from "next/server";
import { createApolloClient } from "@/lib/apolloClient";
import { SEND_PAY_LATER_EMAIL } from "@/lib/mutations";

export async function POST(request: NextRequest) {
  try {
    const { to, subject, body, fineDetails } = await request.json();

    // Validate required fields
    if (!to) {
      return NextResponse.json(
        { success: false, error: "Email recipient is required" },
        { status: 400 },
      );
    }

    if (!subject) {
      return NextResponse.json(
        { success: false, error: "Email subject is required" },
        { status: 400 },
      );
    }

    if (!body) {
      return NextResponse.json(
        { success: false, error: "Email body is required" },
        { status: 400 },
      );
    }

    if (!fineDetails) {
      return NextResponse.json(
        { success: false, error: "Fine details are required" },
        { status: 400 },
      );
    }

    // Create Apollo client for server-side usage
    const heraclesClient = createApolloClient();

    // Execute the GraphQL mutation using Apollo Client
    const result = await heraclesClient.mutate({
      mutation: SEND_PAY_LATER_EMAIL,
      variables: {
        input: {
          to,
          subject,
          body,
          fineDetails,
        },
      },
    });

    if (result.errors) {
      throw new Error(result.errors[0]?.message || "GraphQL error occurred");
    }

    if (!result.data?.sendPayLaterEmail?.success) {
      return NextResponse.json(
        {
          success: false,
          error:
            result.data?.sendPayLaterEmail?.message || "Failed to send email",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          result.data.sendPayLaterEmail.message ||
          "Pay later email sent successfully",
        emailSentTo: to,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to send email",
      },
      { status: 500 },
    );
  }
}
