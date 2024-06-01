import React from 'react';
import ThemeSwitch from './ThemeSwitch';
import { Icon } from '@iconify/react/dist/iconify.js';
import SearchBar from './SearchBar';
import { usePathname } from 'next/navigation';
import { Link } from 'next-view-transitions';
import { UserSession } from '../types';
import {
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger
} from './ui/dropdown-menu';
import LogoutDialog from './LogoutDialog';
import { useTheme } from 'next-themes';
import { ChevronDown } from 'lucide-react';
import PreviewDrawer from './PreviewDrawer';

function NavItems({ user }: { user?: UserSession }) {
  const currentPath = usePathname();
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <div className="flex grow justify-end lg:gap-4">
      <nav className="hidden items-center gap-4 md:flex">
        {currentPath === '/stories' && <SearchBar />}
        {user ? (
          <div className="flex gap-4">
            {currentPath === '/home' && <SearchBar />}
            {currentPath === '/blog/post/create' && (
              <PreviewDrawer />
            )}
            {currentPath === '/home' && (
              <Link href="/blog/post/create">
                <button className="rounded-lg bg-primary-foreground p-2 font-extrabold text-primary active:border-secondary active:bg-secondary active:text-primary-foreground">
                  Create New Post
                </button>
              </Link>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center outline-none [&[data-state=open]>:last-child]:rotate-180">
                  <Icon
                    icon="iconamoon:profile-circle-fill"
                    className="cursor-pointer text-4xl text-primary-foreground"
                  />
                  <ChevronDown className="h-4 w-4 shrink-0 text-primary-foreground transition-transform duration-200" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="absolute -right-3 p-0">
                <DropdownMenuLabel className="bg-gray-500/50 opacity-50">
                  <b>{user.username}</b>
                </DropdownMenuLabel>
                <DropdownMenuGroup className="w-40">
                  <DropdownMenuItem
                    className="p-0"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Link href="/home" className="w-full p-2">
                      Home
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
                    }}
                  >
                    <div className="flex w-full justify-between p-2">
                      <span>Theme</span>
                      <div className="relative w-12">
                        <ThemeSwitch
                          className="absolute inset-y-0 right-0 m-[auto_0] h-4 w-12 appearance-none rounded-full bg-gray-500/50 py-3 after:absolute after:inset-y-[0] after:left-1 after:m-[auto_0] after:h-4 after:w-4 after:translate-x-0 after:rounded-full after:bg-primary-foreground after:duration-500 checked:after:h-4 checked:after:w-4 checked:after:translate-x-6 checked:after:rounded-full"
                          darkIconClass=""
                          lightIconClass="text-[16px]"
                          setTheme={setTheme}
                          resolvedTheme={resolvedTheme}
                        />
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="p-0"
                    onClick={(e) => e.preventDefault()}
                  >
                    <LogoutDialog />
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <React.Fragment>
            <Link href="/login">
              <button className="rounded-lg border border-primary-foreground px-4 py-2 font-extrabold text-primary-foreground after:left-1 hover:bg-primary">
                LOGIN
              </button>
            </Link>
            <div className="relative h-8 w-16">
              <ThemeSwitch
                className="absolute inset-y-0 m-[auto_0] h-6 w-16 appearance-none rounded-full bg-white py-4 after:absolute after:inset-y-[0] after:left-1 after:m-[auto_0] after:h-6 after:w-6 after:translate-x-0 after:rounded-full after:bg-primary-foreground after:duration-500 checked:after:h-6 checked:after:w-6 checked:after:translate-x-8 checked:after:rounded-full dark:bg-black"
                darkIconClass="text-xl"
                lightIconClass="text-2xl"
                setTheme={setTheme}
                resolvedTheme={resolvedTheme}
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
