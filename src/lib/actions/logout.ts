'use server';

import { signOut } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function logout() {
  signOut({ redirect: false });
  const url: string = `${process.env.API_ROUTE}/logout`;

  const logoutResponse = await fetch(url, { credentials: 'include' });
  console.log(logoutResponse.status);

  if (!logoutResponse.ok) throw new Error(logoutResponse.statusText);

  logoutResponse
    .json()
    .then(async () => {
      const logout = await signOut({ redirect: false });
      console.log('logout1: ', logout);
    })
    .catch((err: Error) => {
      console.error('logout2: ', err.message);
    });
    
  return redirect('/');
}
