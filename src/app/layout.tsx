import './globals.css';
import { ViewTransitions } from 'next-view-transitions';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import { SessionProvider } from '@/lib/contexts/SessionContext';
import NextTopLoader from 'nextjs-toploader';
import { NextThemesProvider } from '@/lib/contexts/NextThemesProvider';
import { LoadingProvider } from '@/lib/contexts/LoadingContext';
import { Toaster } from '@/lib/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Blogaer',
  description: 'Blog platform by Andika Eka Putra'
};

export default function GlobalLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <SessionProvider>
            <NextThemesProvider>
              <NextTopLoader
                color="rgb(var(--primary-foreground))"
                showSpinner={false}
              />
              <LoadingProvider>
                {children} <Toaster />
              </LoadingProvider>
            </NextThemesProvider>
          </SessionProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
