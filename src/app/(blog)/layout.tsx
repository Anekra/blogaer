import Navbar from '@/lib/components/Navbar';
import React from 'react';
import { auth } from '@/lib/auth';

export default async function BlogLayout({children}: {children: React.ReactNode}) {
  const session = await auth()
  
  return (
    <main className="w-screen">
      <Navbar user={session?.user} />
      {children}
    </main>
  );
}
