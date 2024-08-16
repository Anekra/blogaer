'use client';
import React, { useEffect, useState } from 'react';
import LogoIcon from '@/lib/components/icons/LogoIcon';
import NavItems from './NavItems';
import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react/dist/iconify.js';

export default function Navbar() {
  const [isScrollingDown, setIsScrollingDown] = useState<boolean | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [prevY, setPrevY] = useState(0);
  const currentPath = usePathname().toLowerCase();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
      window.onscroll = () => {
        const currentY = window.scrollY;
        if (prevY > currentY) setIsScrollingDown(false);
        else if (prevY < currentY) setIsScrollingDown(true);
        setPrevY(currentY);
      };
    }
  }, [prevY]);

  if (isMounted) {
    return (
      <header
        className={`${
          isScrollingDown ? '-translate-y-full' : 'translate-y-0'
        } ${
          window.scrollY === 0 && currentPath === '/'
            ? ''
            : 'bg-background shadow-[0_1px_1px_0_rgb(var(--foreground)/0.2)]'
        } fixed top-0 z-[8] flex w-screen items-center justify-between gap-4 px-6 py-2 transition-transform duration-500`}
      >
        <div className="flex gap-4">
          <button className="flex items-center rounded active:bg-secondary md:hidden">
            <Icon
              icon="mingcute:menu-fill"
              className="box-content rounded px-2 py-1 text-3xl"
            />
          </button>
          <Link href="/">
            <LogoIcon />
          </Link>
        </div>
        <NavItems />
      </header>
    );
  }
}
