'use server';

import { auth, signIn } from '@/lib/auth';
import { RegisterFormSchema } from '@/lib/zodSchemas';
import { z } from 'zod';

export default async function register(
  values: z.infer<typeof RegisterFormSchema>
): Promise<any> {
  const url: string = `${process.env.API_ROUTE}/register`;
  const currentUser = await auth()

  return await signIn('credentials', {
    redirect: true,
    redirectTo: `/${currentUser?.user.username}`,
    values: JSON.stringify(values),
    url
  });
}
