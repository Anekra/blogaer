'use server';

import { signIn } from '@/lib/auth';
import { RegisterFormSchema } from '@/lib/zodSchemas';
import { z } from 'zod';

export default async function register(
  values: z.infer<typeof RegisterFormSchema>
) {
  const path: string = `${process.env.API_ROUTE}/register`;

  try {
    const registerResponse = await fetch(path, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(values)
    });

    if (!registerResponse.ok) throw new Error(registerResponse.statusText);

    const user = registerResponse.json();
    user
      .then((response) => {
        signIn('credentials', response);
      })
      .catch((error) => {
        throw new Error(error);
      });
  } catch (error) {
    console.log('register: ', error);
  }
}
