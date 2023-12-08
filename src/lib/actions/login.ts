'use server'

import { signIn } from '@/lib/auth';
import { LoginFormSchema } from '@/lib/zodSchemas';
import { z } from 'zod';

export default async function login(values: z.infer<typeof LoginFormSchema>) {
  const url: string = `${process.env.API_ROUTE}/login`;

  signIn('credentials', {
    redirect: true,
    redirectTo: 'http://localhost:3000',
    values: JSON.stringify(values),
    url
  });
}
