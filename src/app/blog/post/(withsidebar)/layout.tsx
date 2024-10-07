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
    <React.Fragment>
      <Navbar />
      <div className="flex min-h-screen w-screen max-w-screen-2xl">
        <SideBarProvider>
          <SideBar />
        </SideBarProvider>
        {children}
      </div>
      <Footer />
    </React.Fragment>
  );
}
