import { N8nResponse, TicketDetailsInterface } from '@/lib/schema';

interface SendPayLaterEmailInput {
  to: string;
  subject: string;
  body: string;
  fineDetails: TicketDetailsInterface;
}

interface UseMailerReturn {
  sendPayLaterEmail: (input: TicketDetailsInterface) => Promise<{ success: boolean; message?: string; error?: string }>;
  loading: boolean;
  error: string | null;
}

export const useMailer = (): UseMailerReturn => {
  const sendPayLaterEmail = async (input: TicketDetailsInterface) => {
    try {
      // // Adapt payload to API route expectation: { data: { ...fields } }
      // const apiPayload = {
      //   data: {
      //     email: input.to,
      //     council: input.fineDetails.council || null,
      //     pcn_number: input.fineDetails.pcn_number || (input as any).pcnNumber || null,
      //     plate_number: input.fineDetails.plate_number || (input as any).vehicleNumber || null,
      //     amount: input.fineDetails.amount ?? null,
      //     subject: input.subject,
      //     body: input.body,
      //   }
      // };
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
