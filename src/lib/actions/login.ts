'use server';

import { signIn } from '@/lib/auth';
import { LoginFormSchema } from '@/lib/zodSchemas';
import { z } from 'zod';

export default async function login(values: z.infer<typeof LoginFormSchema>) {
  const path: string = `${process.env.API_ROUTE}/login`;

  try {
    const loginResponse = await fetch(path, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(values)
    });

    if (!loginResponse.ok) throw new Error(loginResponse.statusText);

    const user = loginResponse.json();
    user
      .then((response) => {
        signIn('credentials', response);
      })
      .catch((error) => {
        throw new Error(error);
      });
  } catch (error) {
    console.log('login: ', error);
  }
}
