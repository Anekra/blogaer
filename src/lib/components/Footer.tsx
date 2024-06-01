import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="absolute bottom-0 left-0 z-[8] flex w-screen items-center justify-between gap-2 bg-lighter-background p-4">
      <div className="flex gap-2 text-xs xs:text-sm sm:text-base lg:gap-6">
        <p>© Blogaer</p>
        <Link href="/terms" className="text-secondary-foreground underline">
          Terms
        </Link>
        <Link href="/privacy" className="text-secondary-foreground underline">
          Privacy
        </Link>
      </div>
    </footer>
  );
}
