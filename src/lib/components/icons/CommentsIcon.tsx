import { cn } from '@/lib/utils/shadcn';
import React from 'react';

export default function CommentsIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 48 48"
      className={cn('', className)}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="4"
      >
        <path strokeLinejoin="round" d="M33 38H22v-8h14v-8h8v16h-5l-3 3z" />
        <path strokeLinejoin="round" d="M4 6h32v24H17l-4 4l-4-4H4z" />
        <path d="M12 22h6m-6-8h12" />
      </g>
    </svg>
  );
}
