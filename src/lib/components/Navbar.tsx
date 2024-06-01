'use client';
import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import NavItems from './NavItems';
import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';
import { getLastPathName } from '../utils/helper';
import { UserSession } from '../types';

export default function Navbar({ user }: { user?: UserSession }) {
  const [isScrollingDown, setIsScrollingDown] = useState<boolean | null>(null);
  const [prevY, setPrevY] = useState(0);
  const path = usePathname();
  const lastPathName = getLastPathName(path);

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
        prevY === 0 && path === '/' ? '' : 'bg-lighter-background'
      } fixed top-0 z-[8] flex w-screen items-center justify-between gap-4 px-4 py-2 transition-transform duration-500`}
    >
      <Link href="/">
        <Logo />
      </Link>
      {path !== '/' && (
        <span className="flex flex-col">
          <h1 className="text-2xl font-bold">{lastPathName}</h1>
          <span className="text-xs text-foreground/50">{path}</span>
        </span>
      )}
      <NavItems user={user} />
    </header>
  );
}
