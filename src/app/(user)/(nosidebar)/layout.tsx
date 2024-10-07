import Navbar from '@/lib/components/navs/header/Navbar';
import React from 'react';

export default async function PostNoSBLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
        <Navbar />
        {children}
    </div>
  );
}
