'use client';
import { Icon } from '@iconify/react/dist/iconify.js';
import { usePathname } from 'next/navigation';
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../../ui/accordion';
import { useSideBar } from '../../../contexts/SideBarContext';
import { Link } from 'next-view-transitions';
import { useSession } from '@/lib/contexts/SessionContext';

export default function SideBar() {
  const currentPath = usePathname();
  const { session } = useSession();
  const { isCollapsed, toggleSideBar } = useSideBar();

  return (
    <aside className="hidden h-screen flex-col items-center gap-2 bg-background px-3 pb-16 pt-[76px] transition-[width] duration-300 md:flex">
      <button
        className="rounded-full p-2 hover:bg-gradient-to-t hover:from-background hover:to-foreground/10"
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
            href={`/${session?.username}`}
            className={`${
              currentPath === `/${session?.username}`
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
                  href="/blog/post/published"
                  className={`${
                    currentPath === '/blog/post/published'
                      ? 'border-foreground font-bold text-foreground'
                      : 'border-foreground/20 text-foreground/50'
                  } ${
                    isCollapsed ? 'p-2 ps-1 text-[10px]' : 'p-2 ps-6 text-base'
                  } rounded-r-sm border-l-2 hover:border-foreground hover:bg-foreground/10 hover:text-foreground`}
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
                  } rounded-r-sm border-l-2 hover:border-foreground hover:bg-foreground/10 hover:text-foreground`}
                >
                  Drafts
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Link
            href="/statistic"
            className={`${
              currentPath === '/statistic'
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
