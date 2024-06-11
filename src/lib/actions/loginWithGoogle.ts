'use server';
import { signIn } from '../auth';

export default async function loginWithGoogle() {
  return await signIn('google', { redirect: true, redirectTo: '/home' });
}
