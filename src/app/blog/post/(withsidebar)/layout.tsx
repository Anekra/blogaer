import Footer from '@/lib/components/navs/footer/Footer';
import Navbar from '@/lib/components/navs/header/Navbar';
import SideBar from '@/lib/components/navs/sidebar/SideBar';
import { SideBarProvider } from '@/lib/contexts/SideBarContext';
import React from 'react';

export default async function PostWithSBLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen">
      <Navbar />
      <SideBarProvider>
        <SideBar />
      </SideBarProvider>
      {children}
      <Footer />
    </div>
  );
}
