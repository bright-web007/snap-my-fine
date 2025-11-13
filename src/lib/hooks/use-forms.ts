import { useState } from 'react';

interface UseFormsOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

interface SubmitWaitlistData {
  email: string;
  source?: 'hero' | 'cta';
}

export const useForms = (options?: UseFormsOptions) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitWaitlist = async (data: SubmitWaitlistData) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'waitlist',
          data: {
            email: data.email,
            source: data.source || 'unknown',
            timestamp: new Date().toISOString(),
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit form');
      }

      const result = await response.json();
      setSuccess(true);
      
      if (options?.onSuccess) {
        options.onSuccess(result);
      }

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      
      if (options?.onError) {
        options.onError(errorMessage);
      }
      
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
    setIsSubmitting(false);
  };

  return {
    submitWaitlist,
    isSubmitting,
    error,
    success,
    reset,
  };
};