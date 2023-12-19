'use server';

import { signIn } from '@/lib/auth';
import { RegisterFormSchema } from '@/lib/zodSchemas';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export default async function register(
  values: z.infer<typeof RegisterFormSchema>
): Promise<any> {
  const url: string = `${process.env.API_ROUTE}/register`;

  const register = signIn('credentials', {
    redirect: false,
    values: JSON.stringify(values),
    url
  });

  console.log(register);

  return redirect('/');
}
