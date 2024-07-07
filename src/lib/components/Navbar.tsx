'use client';
import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import NavItems from './NavItems';
import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';
import { getLastPathName } from '../utils/helper';
import { UserSession } from '../types';
import { Icon } from '@iconify/react/dist/iconify.js';

export default function Navbar({ user }: { user?: UserSession }) {
  const [isScrollingDown, setIsScrollingDown] = useState<boolean | null>(null);
  const [prevY, setPrevY] = useState(0);
  const path = usePathname();
  const lastPathName = getLastPathName(path);
  const formattedPath = path.substring(1).split('/').join(' ❯ ');

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
        prevY === 0 && path === '/' ? '' : 'bg-background'
      } fixed top-0 z-[8] flex w-screen items-center justify-between gap-4 px-6 py-2 shadow-[0_1px_1px_0_rgb(var(--foreground)/0.2)] transition-transform duration-500`}
    >
      <div className="flex gap-4">
        <button className="flex items-center rounded active:bg-secondary md:hidden">
          <Icon
            icon="mingcute:menu-fill"
            className="box-content rounded px-2 py-1 text-3xl"
          />
        </button>
        <Link href="/">
          <Logo />
        </Link>
        <span className="flex flex-col">
          <h1 className="text-2xl font-bold">{lastPathName}</h1>
          <span className="text-xs text-foreground/50">{formattedPath}</span>
        </span>
      </div>
      <NavItems user={user} />
    </header>
  );
}
