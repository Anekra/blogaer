'use server'

import { auth, signIn } from '@/lib/auth';
import { LoginFormSchema } from '@/lib/zodSchemas';
import { z } from 'zod';

export default async function POST(values: z.infer<typeof LoginFormSchema>) {
  const url: string = `${process.env.API_ROUTE}/login`;
  const session = await auth()  
  
  return await signIn('credentials', {
    redirect: true,
    redirectTo: `/${session?.user.username}`,
    values: JSON.stringify(values),
    url
  });
}
