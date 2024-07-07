'use server';
import { signIn } from '@/lib/auth';
import { LoginFormSchema } from '@/lib/zodSchemas';
import { z } from 'zod';

type LoginResponse = { success?: boolean };

export default async function login(
  values: z.infer<typeof LoginFormSchema>
): Promise<LoginResponse> {
  try {
    const url: string = `${process.env.API_ROUTE}/auth/login`;

    await signIn('credentials', {
      redirect: false,
      values: JSON.stringify(values),
      url
    });
    return { success: true };
  } catch (error) {
    console.error('error >>>', error);
    
    return { success: false };
  }
}
