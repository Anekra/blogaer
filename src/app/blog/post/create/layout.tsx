import Navbar from '@/lib/components/Navbar';
import React from 'react';

export default async function BlogLayout({children}: {children: React.ReactNode}) {  
  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}
