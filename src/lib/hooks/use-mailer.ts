import { TicketDetailsInterface } from '../schema';

interface UseMailerReturn {
  sendPayLaterEmail: (input: TicketDetailsInterface) => Promise<{ success: boolean; message?: string; error?: string }>;
  sendPaymentSuccessEmail: (input: TicketDetailsInterface) => Promise<{ success: boolean; message?: string; error?: string }>;
  loading: boolean;
  error: string | null;
}

export const useMailer = (): UseMailerReturn => {
  const sendPayLaterEmail = async (input: TicketDetailsInterface) => {
    try {
      const response = await fetch('/api/ticket/email/remind', {
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

  const sendPaymentSuccessEmail = async (input: TicketDetailsInterface) => {
    try {
      const response = await fetch('/api/ticket/email/success', {
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
    sendPaymentSuccessEmail,
    loading: false,
    error: null
  };
};
