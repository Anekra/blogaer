'use server';

import { signOut } from '@/lib/auth';

export default async function logout() {
  const url: string = `${process.env.API_ROUTE}/logout`;

  try {
    const logoutResponse = await fetch(url, { credentials: 'include' });
    console.log(logoutResponse.status);

    if (!logoutResponse.ok) throw new Error(logoutResponse.statusText);

    const response = await logoutResponse.json();

    response
      .then(() => {
        signOut({
          redirect: true,
          redirectTo: 'http://localhost:3000'
        });
      })
      .catch((err: Error) => {
        console.error('logout', err.message);
      });
  } catch (error) {
    console.error('logout', error);
  }
}
