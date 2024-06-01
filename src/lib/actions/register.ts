'use server';

import { signIn } from '@/lib/auth';
import { RegisterFormSchema } from '@/lib/zodSchemas';
import { z } from 'zod';

export default async function register(values: z.infer<typeof RegisterFormSchema>) {
  const url: string = `${process.env.API_ROUTE}/register`;

  return await signIn('credentials', {
    redirect: true,
    redirectTo: '/home',
    values: JSON.stringify(values),
    url
  });
}
