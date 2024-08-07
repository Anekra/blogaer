import Navbar from '@/lib/components/Navbar';
import Footer from '@/lib/components/Footer';
import React from 'react';
import { auth } from '@/lib/auth';

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const session = await auth();
  return (
    <div className="relative w-screen">
      <Navbar user={session?.user} />
      {children}
      <Footer />
    </div>
  );
}
