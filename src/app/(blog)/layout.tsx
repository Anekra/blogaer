import Navbar from '@/lib/components/Navbar';
import React from 'react';

export default async function BlogLayout({children}: {children: React.ReactNode}) {  
  return (
    <main className="w-screen">
      <Navbar />
      {children}
    </main>
  );
}
