'use server';
import { signIn } from '@/lib/auth';
import { LoginFormSchema } from '@/lib/zodSchemas';
import { z } from 'zod';

export default async function login(values: z.infer<typeof LoginFormSchema>) {
  const url: string = `${process.env.API_ROUTE}/auth/login`;
  
  return signIn('credentials', {
    redirect: true,
    redirectTo: '/home',
    values: JSON.stringify(values),
    url
  });
}
