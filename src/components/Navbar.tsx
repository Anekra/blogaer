'use client';

import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import NavItems from './NavItems';
import Link from 'next/link';

export const Navbar = () => {
  const [isScrollingDown, setIsScrollingDown] = useState<boolean | null>(null);
  const [prevY, setPrevY] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.onscroll = () => {
        const currentY = window.scrollY;
        if (prevY > currentY) setIsScrollingDown(false);
        else if (prevY < currentY) setIsScrollingDown(true);
        setPrevY(currentY);
      };
    }
  }, [prevY]);

  return (
    <header
      className={`
        ${isScrollingDown ? '-translate-y-full' : 'translate-y-0'}
        ${prevY > 400 ? 'bg-background' : 'gradient-background'}
        fixed top-0 z-10 flex w-screen items-center justify-between gap-4  px-3 py-2 shadow-sm shadow-black/30 transition-transform duration-500 dark:shadow-white/30 sm:px-12
      `}
    >
      <Link href="/">
        <Logo />
      </Link>
      <NavItems />
    </header>
  );
};
