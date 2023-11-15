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
    <div className="flex grow justify-end lg:gap-4">
      <nav className="hidden items-center gap-4 md:flex">
        <Search />
        <Link href="/login">
          <button className="rounded-lg border-2 border-primary-foreground px-2 py-1 font-extrabold text-primary-foreground active:bg-secondary">
            LOGIN
          </button>
        </Link>
        <Link href="/register">
          <button className="rounded-lg border-2 border-primary-foreground bg-primary-foreground px-2 py-1 font-extrabold text-primary active:border-secondary active:bg-secondary active:text-primary-foreground">
            CREATE ACCOUNT
          </button>
        </Link>
        <div className="relative h-8 w-16">
          <ThemeSwitch />
        </div>
      </nav>
      <button className="flex items-center rounded active:bg-secondary md:hidden">
        <Icon
          icon="mingcute:menu-fill"
          className="box-content rounded px-2 py-1 text-3xl"
        />
      </button>
    </div>
  );
}

export default NavItems;
