import { auth } from '@/lib/auth';
import Navbar from '@/lib/components/Navbar';
import React from 'react';

export default async function BlogLayout({children}: {children: React.ReactNode}) {  
  const session = await auth();

  return (
    <main className="w-screen">
      <Navbar user={session?.user}/>
      {children}
    </main>
  );
}
