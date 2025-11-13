import { NextRequest, NextResponse } from 'next/server';

interface WaitlistSubmissionData {
  email: string;
  source: string;
  timestamp: string;
}

interface FormSubmissionRequest {
  type: 'waitlist';
  data: WaitlistSubmissionData;
}

// Prometheus GraphQL endpoint
const PROMETHEUS_ENDPOINT = process.env.PROMETHEUS_GRAPHQL_ENDPOINT!;

// Form configuration - Set these environment variables with your actual form/question IDs
const WAITLIST_FORM_ID = process.env.WAITLIST_FORM_ID!;
const WAITLIST_EMAIL_QUESTION_ID = process.env.WAITLIST_EMAIL_QUESTION_ID!;
const WAITLIST_SOURCE_QUESTION_ID = process.env.WAITLIST_SOURCE_QUESTION_ID; // Optional

async function submitToPrometheus(email: string, source: string) {
  const mutation = `
    mutation CreateResponse($input: CreateResponseInput!) {
      createResponse(input: $input) {
        data {
          uuid
          response
          created_at
          updated_at
        }
        submission_text
      }
    }
  `;

  // Create response object with question answers
  const response: Record<string, string> = {
    [WAITLIST_EMAIL_QUESTION_ID]: email
  };
  
  // Add source answer if we have a source question configured
  if (WAITLIST_SOURCE_QUESTION_ID && source) {
    response[WAITLIST_SOURCE_QUESTION_ID] = source;
  }

  const variables = {
    input: {
      form_uuid: WAITLIST_FORM_ID,
      response: response
    },
  };

  try {
    const response = await fetch(PROMETHEUS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: mutation,
        variables,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Prometheus API error: ${response.status} ${response.statusText} - ${text}`);
    }

    const result = await response.json();

    if (result.errors) {
      console.error('Prometheus GraphQL errors:', result.errors);
      throw new Error(result.errors[0]?.message || 'GraphQL error occurred');
    }

    return result.data.createResponse;
  } catch (error) {
    console.error('Error submitting to Prometheus:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: FormSubmissionRequest = await request.json();

    if (body.type !== 'waitlist') {
      return NextResponse.json(
        { error: 'Invalid form type' },
        { status: 400 }
      );
    }

    const { email, source } = body.data;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if required environment variables are set
    if (!WAITLIST_FORM_ID || !WAITLIST_EMAIL_QUESTION_ID) {
      return NextResponse.json(
        { 
          error: 'Server configuration error: Missing form or question IDs',
          details: 'Please set WAITLIST_FORM_ID and WAITLIST_EMAIL_QUESTION_ID environment variables'
        },
        { status: 500 }
      );
    }

    // Submit to Prometheus
    const prometheusResponse = await submitToPrometheus(email, source);

    // Log successful submission
    console.log(`Waitlist submission successful: ${email} from ${source}`);

    return NextResponse.json({
      success: true,
      message: prometheusResponse.submission_text || 'Successfully joined the waitlist!',
      submissionId: prometheusResponse.data.uuid,
      submittedAt: prometheusResponse.data.created_at,
    });

  } catch (error) {
    console.error('Form submission error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    
    return NextResponse.json(
      { 
        error: errorMessage,
        success: false 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      message: 'Waitlist API endpoint',
      endpoints: {
        'POST /api/forms': 'Submit waitlist signup to Prometheus'
      },
      configuration: {
        formId: WAITLIST_FORM_ID || 'Not configured',
        emailQuestionId: WAITLIST_EMAIL_QUESTION_ID || 'Not configured',
        sourceQuestionId: WAITLIST_SOURCE_QUESTION_ID || 'Not configured (optional)'
      }
    },
    { status: 200 }
  );
}