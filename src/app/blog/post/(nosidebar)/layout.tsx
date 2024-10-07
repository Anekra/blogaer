import Navbar from '@/lib/components/navs/header/Navbar';
import { ContentProvider } from '@/lib/contexts/ContentContext';
import React from 'react';

export default async function PostNoSBLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ContentProvider>
      <Navbar />
      <main className="flex justify-between gap-6 pb-6 pt-8">{children}</main>
    </ContentProvider>
  );
}
