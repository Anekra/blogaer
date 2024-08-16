import Navbar from '@/lib/components/navs/header/Navbar';
import { ContentProvider } from '@/lib/contexts/ContentContext';
import React from 'react';

export default async function PostNoSBLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <ContentProvider>
        <Navbar />
        {children}
      </ContentProvider>
    </div>
  );
}
