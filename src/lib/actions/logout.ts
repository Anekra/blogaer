'use server';
import { cookies } from 'next/headers';

export default async function logout(): Promise<boolean> {
  const accessCookieName = `${process.env.ACCESS_TOKEN}`;
  const refreshCookieName = `${process.env.REFRESH_TOKEN}`;
  const url: string = `${process.env.API_ROUTE}/logout`;
  const refreshToken = cookies().get(refreshCookieName)?.value;
  cookies().delete(accessCookieName);
  cookies().delete(refreshCookieName);
  try {
    await fetch(url, {
      headers: {
        Origin: 'http://localhost:3000',
        Cookie: `${process.env.REFRESH_TOKEN}=${refreshToken}`
      } 
    });
    return true;
  } catch (error) {
    return false
  }
}
