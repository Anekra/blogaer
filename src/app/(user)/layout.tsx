import { auth } from '@/lib/auth';
import Footer from '@/lib/components/Footer';
import Navbar from '@/lib/components/Navbar';
import Sidebar from '@/lib/components/Sidebar';
import React from 'react';

export default async function UserLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <main className="flex min-h-screen pb-14 pt-16">
      <Navbar user={session?.user} />
      <Sidebar />
      {children}
      <Footer />
    </main>
  );
}
