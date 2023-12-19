'use server';

import { signIn } from '@/lib/auth';
import { LoginFormSchema } from '@/lib/zodSchemas';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export default async function login(values: z.infer<typeof LoginFormSchema>) {
  const url: string = `${process.env.API_ROUTE}/login`;

  const login = await signIn('credentials', {
    redirect: false,
    values: JSON.stringify(values),
    url
  });

  console.log(login);

  return redirect('/');
}
