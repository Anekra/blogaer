import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
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
