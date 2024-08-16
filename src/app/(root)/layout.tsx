import Navbar from '@/lib/components/navs/header/Navbar';
import Footer from '@/lib/components/navs/footer/Footer';
import React from 'react';

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
