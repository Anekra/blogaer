'use server'
import { auth, signOut } from '@/lib/auth';

export default async function logout() {
  const url: string = `${process.env.API_ROUTE}/logout`;
  const session = await auth()

  const logoutResponse = await fetch(url, {
    headers: {
      Origin: 'http://localhost:3000',
      Cookie: `jwt=${session?.user.refresh}` 
    }
  });

  if (!logoutResponse.ok) throw new Error('Logout failed');

  return await signOut({ redirect: true, redirectTo: '/' });
}
