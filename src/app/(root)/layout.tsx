import Navbar from '@/lib/components/Navbar';
import Footer from '@/lib/components/Footer';
import React from 'react';

export default async function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="w-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
