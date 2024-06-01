import { auth } from '@/lib/auth';
import Navbar from '@/lib/components/Navbar';
import { ContentProvider } from '@/lib/contexts/ContentContext';
import React from 'react';

export default async function BlogLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <div className="min-h-screen">
      <ContentProvider>
        <Navbar user={session?.user} />
        {children}
      </ContentProvider>
    </div>
  );
}
