'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeSwitch from '@/components/ThemeSwitch';

export const Navbar = () => {
  const currentPath = usePathname();

  return (
    <header className="fixed w-screen top-0 z-[10] shadow-sm shadow-black/30 dark:shadow-white/30 bg-background flex items-center justify-between py-2 px-12 transition-transform duration-500">
      <nav className="flex items-center gap-4">
        <button className="flex items-center md:hidden">
          <Icon icon="mingcute:menu-fill" />
        </button>
        <svg
          width="122"
          height="50"
          viewBox="0 0 182 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M162.421 56.5372L182 110H167.167L148.775 59.5407H91.5L74.5 49C134.423 49 157.081 47.5266 157.081 30.7068C157.081 13.2863 146.995 13.2155 87.0718 13.2155L58 0C101.311 1.20141 142.249 -3.00353 160.641 6.00706C172.807 11.9671 179.034 37.9153 162.421 56.5372Z"
            fill="#9B4429"
          />
          <path
            d="M87.4545 69.5355L92.1818 80.7466H128.64L124.506 69.5355H87.4545Z"
            fill="#9B4429"
          />
          <path
            d="M43 110H168L163 97C163 98.8676 116.482 98.1717 87.6146 98.1717L43 110Z"
            fill="#9B4429"
          />
          <path
            d="M138.864 109H153.636L114.045 0.498299H99.2727L124.506 69.5355H127.636L131.773 80.7466H128.64L138.864 109Z"
            fill="#9B4429"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 2.5696e-06C0 2.5696e-06 6.49398 1.64039e-05 53.6697 2.5696e-06C100.845 -1.12647e-05 98.4928 40.4324 67.8244 46.973C118.545 59.4594 99.0826 110 55.4391 110H0C28.3093 110 30.6684 0.135608 0 2.5696e-06ZM35.9764 44.8044C35.4253 27.5746 34.2704 21.1225 31.2892 13.1038C87.3735 7.72071 76.747 44.8044 35.9764 44.8044ZM35.9764 57.081C102.723 57.081 83.3232 101.626 31.2892 101.626C35.9289 84.144 36.4603 74.4055 35.9764 57.081Z"
            fill="#9B4429"
          />
        </svg>
      </nav>
      <nav className="hidden md:flex text-muted-foreground/50 font-extrabold">
        <Link
          href="/"
          className={`${currentPath === '/' ? 'text-primary-foreground' : ''}
            rounded-3xl px-4 py-2 hover:bg-primary hover:text-foreground`}
        >
          HOME
        </Link>
        <Link
          href="/stories"
          className={`${
            currentPath === '/stories' ? 'text-primary-foreground' : ''
          }
            rounded-3xl px-4 py-2 hover:bg-primary hover:text-foreground`}
        >
          STORIES
        </Link>
        <Link
          href="/categories"
          className={`${
            currentPath === '/categories' ? 'text-primary-foreground' : ''
          }
          rounded-3xl px-4 py-2 hover:bg-primary hover:text-foreground`}
        >
          CATEGORIES
        </Link>
      </nav>
      <nav className="relative h-8 w-16">
        <ThemeSwitch />
      </nav>
    </header>
  );
};
