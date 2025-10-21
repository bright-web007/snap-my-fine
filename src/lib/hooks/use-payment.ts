import { useState } from "react";

interface PaymentData {
  amount: string;
  pcnNumber: string;
  vehicleReg: string;
  email: string;
  fullName: string;
}

interface PaymentResponse {
  payment_id: string;
  authorization_url: string;
  status: string;
}

interface UsePaymentReturn {
  makePayment: (data: PaymentData) => Promise<PaymentResponse>;
  loading: boolean;
  error: string | null;
}

export const usePayment = (): UsePaymentReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const makePayment = async (data: PaymentData): Promise<PaymentResponse> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    makePayment,
    loading,
    error,
  };
};
