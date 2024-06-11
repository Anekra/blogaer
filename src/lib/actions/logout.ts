'use server'

import { signOut } from '@/lib/auth';
import { cookies } from 'next/headers';

export default async function logout() {
  const url: string = `${process.env.API_ROUTE}/logout`;

  const logoutResponse = await fetch(url, {
    headers: {
      Origin: 'http://localhost:3000',
      Cookie: `jwt=${cookies().get('session-token')?.value}` 
    }
  });

  if (!logoutResponse.ok) throw new Error('Logout failed');

  return await signOut({ redirect: true, redirectTo: '/' });
}
