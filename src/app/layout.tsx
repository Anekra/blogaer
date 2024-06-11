import './globals.css';
import { ViewTransitions } from 'next-view-transitions';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextThemesProvider } from '@/lib/contexts/NextThemesProvider';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Blogaer',
  description: 'Blog platform by Andika Eka Putra'
};

export default function GlobalLayout({ children }: { children: React.ReactNode; }) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <SessionProvider>
            <NextThemesProvider>
              <NextTopLoader
                color="hsl(var(--secondary-foreground))"
                showSpinner={false}
              />
              {children}
            </NextThemesProvider>
          </SessionProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
