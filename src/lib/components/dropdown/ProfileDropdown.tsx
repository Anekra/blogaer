'use client';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { Icon } from '@iconify/react/dist/iconify.js';
import { ChevronDown } from 'lucide-react';
import { Link } from 'next-view-transitions';
import { useTheme } from 'next-themes';
import { useSession } from '@/lib/contexts/SessionContext';
import LogoutDialog from '../dialogs/LogoutDialog';
import ThemeSwitch from '../widgets/ThemeSwitch';

export default function ProfileDropdown() {
  const { session } = useSession();
  const { setTheme, resolvedTheme } = useTheme();

  return (
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
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel className="bg-gray-500/50 opacity-50">
          <b>{session?.username}</b>
        </DropdownMenuLabel>
        <DropdownMenuGroup className="[&>*]:p-0 hover:[&>*]:bg-foreground/70 hover:[&>*]:text-base-background">
          <DropdownMenuItem onClick={(e) => e.preventDefault()}>
            <Link href="/home" className="w-full p-2">
              Home
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex h-9 w-full items-center justify-between !px-2 !py-[6px] [&>*:nth-child(2)]:hover:bg-background"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
            }}
          >
            <span>Theme</span>
            <ThemeSwitch
              width="w-12"
              padding="p-[1px]"
              transform="translate-x-[150%]"
              setTheme={setTheme}
              resolvedTheme={resolvedTheme}
            />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(e) => e.preventDefault()}>
            <LogoutDialog />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
