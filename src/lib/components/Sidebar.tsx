'use client';
import { Icon } from '@iconify/react/dist/iconify.js';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from './ui/accordion';

export default function Sidebar() {
  const currentPath = usePathname();
  const [isCollapse, setIsCollapse] = useState(false);
  return (
    <aside className="flex flex-col items-center gap-2 bg-light-background p-3">
      <button
        className={`${
          isCollapse ? '' : 'border-[1px] border-foreground'
        } w-fit rounded-full bg-gradient-to-t from-background to-foreground/10 p-2  `}
        onClick={() => setIsCollapse(!isCollapse)}
      >
        <Icon
          icon={`${
            isCollapse
              ? 'iconamoon:menu-kebab-vertical-bold'
              : 'mingcute:menu-fill'
          }`}
          className="text-2xl"
        />
      </button>
      <nav
        className={`${
          isCollapse ? 'w-16' : 'w-40'
        } flex flex-col gap-1 transition-all duration-300`}
      >
        <div className="flex flex-col [&>*]:justify-center">
          <Link
            href="/home"
            className={`${
              currentPath === '/home' ? 'bg-foreground/25 font-bold' : ''
            } ${
              isCollapse ? 'flex-col items-center' : 'gap-4'
            } flex rounded p-2`}
          >
            <Icon icon="ion:home" className="text-xl" />
            <span className={`${isCollapse ? 'text-[10px]' : ''} grow`}>
              Home
            </span>
          </Link>
          <Link
            href="/dashboard"
            className={`${
              currentPath === '/dashboard' ? 'bg-foreground/25 font-bold' : ''
            } ${
              isCollapse ? 'flex-col items-center' : 'gap-4'
            } flex rounded p-2`}
          >
            <Icon icon="ic:round-dashboard" className="text-xl" />
            <span className={`${isCollapse ? 'text-[10px]' : ''} grow`}>
              Dashboard
            </span>
          </Link>
        </div>
        <hr className="border-foreground/30" />
        <div className="flex flex-col">
          {!isCollapse && (
            <span className="p-2 text-sm font-bold text-muted-foreground">
              Blog
            </span>
          )}
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger
                className={`${
                  isCollapse ? 'justify-center' : ''
                }`}
              >
                <div
                  className={`${
                    isCollapse ? 'flex-col items-center py-2 ps-2' : 'gap-4 p-2'
                  } flex`}
                >
                  <Icon icon="iconoir:post-solid" className="text-xl" />
                  <span className={`${isCollapse ? 'text-[10px]' : 'grow'}`}>
                    Posts
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent
                className={`${isCollapse ? '' : 'pe-2 ps-4'} flex flex-col `}
              >
                <span
                  className={`${
                    isCollapse ? 'p-2 ps-2 text-[10px]' : 'p-2 ps-6 text-base'
                  } border-l-2 border-foreground/20`}
                >
                  Published
                </span>
                <span
                  className={`${
                    isCollapse ? 'p-2 ps-2 text-[10px]' : 'p-2 ps-6 text-base'
                  } border-l-2 border-foreground/20`}
                >
                  Drafts
                </span>
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
              isCollapse ? 'flex-col items-center' : 'gap-4'
            } flex justify-center rounded p-2`}
          >
            <Icon icon="solar:chart-bold" className="text-xl" />
            <span className={`${isCollapse ? 'text-[10px]' : ''} grow`}>
              Stats
            </span>
          </Link>
        </div>
        <hr className="border-foreground/30" />
        <div className="flex flex-col">
          {!isCollapse && (
            <span className="p-2 text-sm font-bold text-muted-foreground">
              Settings
            </span>
          )}
          <Link
            href="settings/profile"
            className={`${
              currentPath === 'settings/profile'
                ? 'bg-foreground/25 font-bold'
                : ''
            } ${
              isCollapse ? 'flex-col items-center' : 'gap-4'
            } flex justify-center rounded p-2`}
          >
            <Icon icon="iconamoon:profile-fill" className="text-xl" />
            <span className={`${isCollapse ? 'text-[10px]' : ''} grow`}>
              Account
            </span>
          </Link>
        </div>
      </nav>
    </aside>
  );
}
