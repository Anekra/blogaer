'use client'

import { cn } from '@/lib/utils/shadcn';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function BackBtn({className}: {className: string | undefined;}) {
  const router = useRouter();
  return(
    <button className="absolute left-5 top-5 rounded-full text-xl hover:bg-foreground hover:text-background"
      onClick={() => router.back()}>
      <Icon icon="mingcute:arrow-left-fill" className={cn(className)} />
    </button>
  ) 
}
