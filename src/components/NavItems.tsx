import React from 'react';
import ThemeSwitch from './ThemeSwitch';
import { Icon } from '@iconify/react/dist/iconify.js';
import SearchBar from './SearchBar';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

function Search() {
  if (usePathname() === '/stories') {
    return <SearchBar />;
  }
}

function NavItems() {
  return (
    <div className="flex flex-grow lg:gap-4 justify-end">
      <nav className="md:flex hidden gap-4 items-center">
        <Search />
        <Link href="/login">
          <button className="btn rounded-lg border-2 border-primary-foreground text-primary-foreground py-1 px-2 font-extrabold">
            LOGIN
          </button>
        </Link>
        <Link href="/register">
          <button className="btn rounded-lg border-2 border-primary-foreground bg-primary-foreground py-1 px-2 font-extrabold text-white dark:text-black">
            CREATE ACCOUNT
          </button>
        </Link>
        <div className="relative h-8 w-16">
          <ThemeSwitch />
        </div>
      </nav>
      <button className="btn flex items-center md:hidden rounded">
        <Icon
          icon="mingcute:menu-fill"
          className="text-3xl rounded py-1 px-2 box-content"
        />
      </button>
    </div>
  );
}

export default NavItems;
