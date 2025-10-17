import { N8nResponse } from '@/lib/schema';

interface SendPayLaterEmailInput {
  to: string;
  subject: string;
  body: string;
  fineDetails: N8nResponse;
}

interface UseMailerReturn {
  sendPayLaterEmail: (input: SendPayLaterEmailInput) => Promise<{ success: boolean; message?: string; error?: string }>;
  loading: boolean;
  error: string | null;
}

export const useMailer = (): UseMailerReturn => {
  const sendPayLaterEmail = async (input: SendPayLaterEmailInput) => {
    try {
      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        return {
          success: true,
          message: result.message || 'Email sent successfully'
        };
      } else {
        return {
          success: false,
          error: result.error || 'Failed to send email'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      };
    }
  };

  return {
    sendPayLaterEmail,
    loading: false, // The loading state would be managed at call time in a real implementation
    error: null     // The error state would also be managed at call time in a real implementation
  };
};
