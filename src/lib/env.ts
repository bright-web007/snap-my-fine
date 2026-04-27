import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_GTM_ID: z.string().min(1, 'NEXT_PUBLIC_GTM_ID is required'),
});

function validateEnv() {
  const result = envSchema.safeParse({
    NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
  });

  if (!result.success) {
    console.error('Environment validation failed:');
    result.error.issues.forEach((err) => {
      console.error(`- ${err.path.join('.')}: ${err.message}`);
    });
    throw new Error('Invalid environment configuration');
  }

  return result.data;
}

export const env = validateEnv();
