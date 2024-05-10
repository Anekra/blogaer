'use client';

import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import NavItems from './NavItems';
import Link from 'next/link';
import { UserSession } from '../types';
import { usePathname } from 'next/navigation';

export default function Navbar({ user }: { user?: UserSession }) {
  const [isScrollingDown, setIsScrollingDown] = useState<boolean | null>(null);
  const [prevY, setPrevY] = useState(0);
  const path = usePathname();

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
      className={`${isScrollingDown ? '-translate-y-full' : 'translate-y-0'} ${
        prevY > 0 ? 'bg-primary' : path === '/' ? '' : 'bg-light-background'
      } fixed top-0 z-10 flex w-screen items-center justify-between gap-4 px-4 py-2 transition-transform duration-500`}
    >
      <Link href="/">
        <Logo />
      </Link>
      <NavItems user={user} />
    </header>
  );
}
