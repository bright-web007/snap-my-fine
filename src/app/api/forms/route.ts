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

// Prometheus GraphQL endpoint - using localhost for local development
const PROMETHEUS_ENDPOINT = process.env.PROMETHEUS_GRAPHQL_ENDPOINT || 'http://localhost:3000/graphql';

// Form configuration - update these with actual values from Prometheus
const WAITLIST_FORM_CONFIG = {
  formId: process.env.WAITLIST_FORM_ID || 'your-form-id-here',
  emailQuestionId: process.env.WAITLIST_EMAIL_QUESTION_ID || 'your-email-question-id-here',
};

async function submitToPrometheus(email: string, source: string, projectToken: string) {
  const mutation = `
    mutation SubmitWaitlistResponse($input: SubmitResponseInput!) {
      submitResponse(input: $input) {
        id
        submittedAt
        answers {
          questionId
          value
        }
      }
    }
  `;

  const variables = {
    input: {
      formId: WAITLIST_FORM_CONFIG.formId,
      answers: [
        {
          questionId: WAITLIST_FORM_CONFIG.emailQuestionId,
          value: email,
        },
      ],
    },
  };

  console.log('Submitting to Prometheus:', {
    endpoint: PROMETHEUS_ENDPOINT,
    formId: WAITLIST_FORM_CONFIG.formId,
    questionId: WAITLIST_FORM_CONFIG.emailQuestionId,
    email,
    source
  });

  try {
    const response = await fetch(PROMETHEUS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-project-token': projectToken,
      },
      body: JSON.stringify({
        query: mutation,
        variables,
      }),
    });

    console.log('Prometheus response status:', response.status);
    
    const responseText = await response.text();
    console.log('Prometheus raw response:', responseText);

    if (!response.ok) {
      throw new Error(`Prometheus API error: ${response.status} ${response.statusText} - ${responseText}`);
    }

    const result = JSON.parse(responseText);

    if (result.errors && result.errors.length > 0) {
      console.error('Prometheus GraphQL errors:', JSON.stringify(result.errors, null, 2));
      throw new Error(`GraphQL error: ${result.errors[0]?.message || 'Unknown GraphQL error'}`);
    }

    if (!result.data || !result.data.submitResponse) {
      console.error('No data returned from Prometheus:', result);
      throw new Error('No response data returned from Prometheus');
    }

    console.log('Prometheus success:', result.data.submitResponse);
    return result.data.submitResponse;
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

    // Get project token from headers (required)
    const projectToken = request.headers.get('x-project-token');

    if (!projectToken) {
      return NextResponse.json(
        { error: 'Project token is required' },
        { status: 401 }
      );
    }

    // Submit to Prometheus
    const prometheusResponse = await submitToPrometheus(email, source, projectToken);

    // Log successful submission
    console.log(`Waitlist submission successful: ${email} from ${source}`);

    return NextResponse.json({
      success: true,
      message: 'Successfully joined the waitlist!',
      submissionId: prometheusResponse.id,
      submittedAt: prometheusResponse.submittedAt,
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
      message: 'Forms API endpoint',
      endpoints: {
        'POST /api/forms': 'Submit form data to Prometheus'
      }
    },
    { status: 200 }
  );
}