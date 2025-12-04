import { useQuery } from '@tanstack/react-query';

interface MercuryTokenResponse {
  success: boolean;
  token: string;
}

export function useMercuryProjectToken() {
  return useQuery<MercuryTokenResponse>({
    queryKey: ['mercury-project-token'],
    staleTime: 60 * 60 * 1000, // Data stays fresh for 1 hour (60 minutes)
    gcTime: 60 * 60 * 1000, // Cache for 1 hour
    queryFn: async () => {
      const response = await fetch('/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch project token');
      }

      return response.json();
    },
  });
}
