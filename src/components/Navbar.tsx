'use client';

import React, { useState } from 'react';
import Logo from './Logo';
import NavItems from './NavItems';

export const Navbar = () => {
  let [isScrollingDown, setIsScrollingDown] = useState<boolean | null>(null);
  let [prevY, setPrevY] = useState(0);

  if (typeof window !== undefined) {
    window.onscroll = () => {
      let currentY = window.scrollY;
      if (prevY > currentY) setIsScrollingDown(false);
      else if (prevY < currentY) setIsScrollingDown(true);
      setPrevY(currentY);
    };
  }

  return (
    <header
      className={`
        ${isScrollingDown ? '-translate-y-full' : 'translate-y-0'}
        ${prevY > 490 ? 'bg-background' : 'gradient-background'}
        fixed w-screen top-0 gap-4 z-10 shadow-sm shadow-black/30 dark:shadow-white/30  flex items-center justify-between py-2 px-12 transition-transform duration-500
      `}
    >
      <Logo />
      <NavItems />
    </header>
  );
};
