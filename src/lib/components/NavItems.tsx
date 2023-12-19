import React from 'react';
import ThemeSwitch from './ThemeSwitch';
import { Icon } from '@iconify/react/dist/iconify.js';
import SearchBar from './SearchBar';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { User } from '../types';
import {
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger
} from './ui/dropdown-menu';
import LogoutDialog from './LogoutDialog';

function Search() {
  if (usePathname() === '/stories') {
    return <SearchBar />;
  }
}

function NavItems({ user }: { user: User }) {
  return (
    <div className="flex grow justify-end lg:gap-4">
      <nav className="hidden items-center gap-4 md:flex">
        <Search />
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Icon
                icon="iconamoon:profile-circle-fill"
                className="cursor-pointer text-4xl"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="absolute -right-3 p-0">
              <DropdownMenuLabel className="bg-gray-500/50 opacity-50">
                <b>{user.username}</b>
              </DropdownMenuLabel>
              <DropdownMenuGroup className="w-40">
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem
                  className="flex justify-between"
                  onClick={(e) => e.stopPropagation()}
                >
                  Theme
                  <div className="relative w-12">
                    <ThemeSwitch
                      className="absolute inset-y-0 right-0 m-[auto_0] h-4 w-12 appearance-none rounded-full bg-gray-500/50 py-3 after:absolute after:inset-y-[0] after:left-1 after:m-[auto_0] after:h-4 after:w-4 after:translate-x-0 after:rounded-full after:bg-primary-foreground after:duration-500 checked:after:h-4 checked:after:w-4 checked:after:translate-x-6 checked:after:rounded-full"
                      darkIconClass=""
                      lightIconClass="text-[16px]"
                    />
                  </div>
                </DropdownMenuItem>
                <LogoutDialog />
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <React.Fragment>
            <Link href="/login">
              <button className="rounded-lg border-2 border-primary-foreground px-2 py-1 font-extrabold text-primary-foreground after:left-1 active:bg-secondary">
                LOGIN
              </button>
            </Link>
            <Link href="/register">
              <button className="rounded-lg border-2 border-primary-foreground bg-primary-foreground px-2 py-1 font-extrabold text-primary active:border-secondary active:bg-secondary active:text-primary-foreground">
                CREATE ACCOUNT
              </button>
            </Link>
            <div className="relative h-8 w-16">
              <ThemeSwitch
                className="absolute inset-y-0 m-[auto_0] h-6 w-16 appearance-none rounded-full bg-white py-4 after:absolute after:inset-y-[0] after:left-1 after:m-[auto_0] after:h-6 after:w-6 after:translate-x-0 after:rounded-full after:bg-primary-foreground after:duration-500 checked:after:h-6 checked:after:w-6 checked:after:translate-x-8 checked:after:rounded-full dark:bg-black"
                darkIconClass="text-xl"
                lightIconClass="text-2xl"
              />
            </div>
          </React.Fragment>
        )}
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
