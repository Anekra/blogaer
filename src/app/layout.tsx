import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextThemesProvider } from '@/lib/contexts/NextThemesProvider';
import React from 'react';
import { SessionProvider } from 'next-auth/react';

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
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <NextThemesProvider>{children}</NextThemesProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
