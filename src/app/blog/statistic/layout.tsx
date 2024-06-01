import { auth } from '@/lib/auth';
import Footer from '@/lib/components/Footer';
import Navbar from '@/lib/components/Navbar';
import SideBar from '@/lib/components/SideBar';
import { SideBarProvider } from '@/lib/contexts/SideBarContext';
import React from 'react';

export default async function StatisticLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <div className="relative flex min-h-screen">
      <Navbar />
      <SideBarProvider>
        <SideBar user={session?.user} />
      </SideBarProvider>
      {children}
      <Footer />
    </div>
  );
}
