import { NextRequest, NextResponse } from 'next/server';

interface MercuryTokenResponse {
  success: boolean;
  token: string;
}

// Mercury token endpoint
const MERCURY_TOKEN_ENDPOINT = process.env.MERCURY_TOKEN_ENDPOINT!;

export async function POST(request: NextRequest) {
  try {
    const response = await fetch(MERCURY_TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        app_id: process.env.ATHENS_APP_ID,
        app_secret: process.env.ATHENS_APP_SECRET,
      }),
    });

    if (!response.ok) {
      throw new Error(`Mercury API error: ${response.status} ${response.statusText}`);
    }

    const data: MercuryTokenResponse = await response.json();

    if (!data.success || !data.token) {
      throw new Error('Invalid token response from Mercury');
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error('Token generation error:', error);

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
      message: 'Token API endpoint',
      endpoints: {
        'POST /api/token': 'Generate Mercury project token'
      }
    },
    { status: 200 }
  );
}