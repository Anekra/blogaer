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
  return (
    <div className="flex min-h-screen pb-14 pt-16">
      <Navbar />
      <SideBarProvider>
        <SideBar />
      </SideBarProvider>
      {children}
      <Footer />
    </div>
  );
}
