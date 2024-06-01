'use client';
import { Icon } from '@iconify/react/dist/iconify.js';
import { usePathname } from 'next/navigation';
import React, { useContext } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from './ui/accordion';
import { SideBarContext } from '../contexts/SideBarContext';
import { UserSession } from '../types';
import { Link } from 'next-view-transitions';

export default function SideBar({ user }: { user?: UserSession }) {
  const currentPath = usePathname();
  const { isCollapsed, toggleSideBar } = useContext(SideBarContext);
  
  return (
    <aside className="flex flex-col items-center gap-2 bg-lighter-background px-3 pb-14 pt-[76px]">
      <button
        className={`${
          isCollapsed ? '' : 'self-end'
        } rounded-full p-2 hover:bg-gradient-to-t hover:from-background hover:to-foreground/10`}
        onClick={() => toggleSideBar()}
      >
        <Icon
          icon={`${
            isCollapsed ? 'pajamas:expand-left' : 'pajamas:collapse-left'
          }`}
          className="text-2xl"
        />
      </button>
      <nav
        className={`${
          isCollapsed ? 'w-16' : 'w-40'
        } flex flex-col gap-1 transition-[width] duration-300`}
      >
        <div className="flex flex-col [&>*]:justify-center">
          <Link
            href="/home"
            className={`${
              currentPath === '/home' ? 'bg-foreground/25 font-bold' : ''
            } ${
              isCollapsed ? 'flex-col items-center' : 'gap-4'
            } flex rounded p-2`}
          >
            <Icon icon="ion:home" className="text-xl" />
            <span className={`${isCollapsed ? 'text-[10px]' : ''} grow`}>
              Home
            </span>
          </Link>
          <Link
            href="/dashboard"
            className={`${
              currentPath === '/dashboard' ? 'bg-foreground/25 font-bold' : ''
            } ${
              isCollapsed ? 'flex-col items-center' : 'gap-4'
            } flex rounded p-2`}
          >
            <Icon icon="ic:round-dashboard" className="text-xl" />
            <span className={`${isCollapsed ? 'text-[10px]' : ''} grow`}>
              Dashboard
            </span>
          </Link>
          <Link
            href={`/${user?.username}`}
            className={`${
              currentPath === `/${user?.username}`
                ? 'bg-foreground/25 font-bold'
                : ''
            } ${
              isCollapsed ? 'flex-col items-center' : 'gap-4'
            } flex rounded p-2`}
          >
            <Icon icon="mingcute:profile-fill" className="text-xl" />
            <span className={`${isCollapsed ? 'text-[10px]' : ''} grow`}>
              Profile
            </span>
          </Link>
        </div>
        <hr className="border-foreground/30" />
        <div className="flex flex-col">
          {!isCollapsed && (
            <span className="p-2 text-sm font-bold text-muted-foreground">
              Blog
            </span>
          )}
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger
                className={`${
                  currentPath.includes('/post')
                    ? 'bg-foreground/25 font-bold'
                    : ''
                } ${isCollapsed ? 'justify-center' : 'p-2'} rounded`}
              >
                <div
                  className={`${
                    isCollapsed ? 'flex-col items-center py-2 ps-2' : 'gap-4'
                  } flex`}
                >
                  <Icon icon="iconoir:post-solid" className="text-xl" />
                  <span className={`${isCollapsed ? 'text-[10px]' : 'grow'}`}>
                    Posts
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent
                className={`${
                  isCollapsed ? 'ps-1' : 'pe-2 ps-4'
                } flex flex-col `}
              >
                <Link
                  href="/blog/post/publish"
                  className={`${
                    currentPath === '/blog/post/publish'
                      ? 'border-foreground font-bold text-foreground'
                      : 'border-foreground/20 text-foreground/50'
                  } ${
                    isCollapsed ? 'p-2 ps-1 text-[10px]' : 'p-2 ps-6 text-base'
                  } border-l-2`}
                >
                  Published
                </Link>
                <Link
                  href="/blog/post/draft"
                  className={`${
                    currentPath === '/blog/post/draft'
                      ? 'border-foreground font-bold text-foreground'
                      : 'border-foreground/20 text-foreground/50'
                  } ${
                    isCollapsed ? 'p-2 ps-1 text-[10px]' : 'p-2 ps-6 text-base'
                  } border-l-2`}
                >
                  Drafts
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Link
            href="/blog/statistic"
            className={`${
              currentPath === '/blog/statistic'
                ? 'bg-foreground/25 font-bold'
                : ''
            } ${
              isCollapsed ? 'flex-col items-center' : 'gap-4'
            } flex justify-center rounded p-2`}
          >
            <Icon icon="solar:chart-bold" className="text-xl" />
            <span className={`${isCollapsed ? 'text-[10px]' : ''} grow`}>
              Stats
            </span>
          </Link>
        </div>
        <hr className="border-foreground/30" />
        <div className="flex flex-col">
          {!isCollapsed && (
            <span className="p-2 text-sm font-bold text-muted-foreground">
              Settings
            </span>
          )}
          <Link
            href="/settings/account"
            className={`${
              currentPath === '/settings/account'
                ? 'bg-foreground/25 font-bold'
                : ''
            } ${
              isCollapsed ? 'flex-col items-center' : 'gap-4'
            } flex justify-center rounded p-2`}
          >
            <Icon icon="iconamoon:profile-fill" className="text-xl" />
            <span className={`${isCollapsed ? 'text-[10px]' : ''} grow`}>
              Account
            </span>
          </Link>
        </div>
      </nav>
    </aside>
  );
}
