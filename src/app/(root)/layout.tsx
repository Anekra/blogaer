import Navbar from '@/lib/components/Navbar';
import Footer from '@/lib/components/Footer';
import React from 'react';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <main className="w-screen">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
