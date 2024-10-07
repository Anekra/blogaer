import { cn } from '@/lib/utils/shadcn';
import React from 'react';

export default function LikeIt({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 56 56"
      className={cn('h-5 w-5', className)}
    >
      <path
        fill="currentColor"
        d="M43.937 51.766c1.829-.422 3.68-1.618 3.68-3.868c0-.914-.258-1.546-.562-2.086c-.188-.304-.164-.539.117-.656c1.476-.656 2.695-1.968 2.695-3.867c0-1.055-.281-2.016-.82-2.695c-.258-.352-.211-.633.21-.89c1.102-.61 1.806-1.97 1.806-3.517c0-1.078-.352-2.273-1.009-2.859c-.35-.328-.28-.562.118-.89c.773-.586 1.195-1.711 1.195-3.047c0-2.297-1.781-4.149-4.125-4.149h-8.367c-2.11 0-3.54-1.101-3.54-2.836c0-3.234 4.009-9.047 4.009-13.242c0-2.18-1.43-3.492-3.282-3.492c-1.687 0-2.554 1.172-3.468 2.953c-3.493 6.89-8.227 12.445-11.813 17.203c-3.047 4.078-4.547 7.5-4.617 13.125c-.117 8.649 6.89 15.234 17.906 15.328l3.258.024c3.07.023 5.32-.211 6.61-.54M4.633 37.117c0 7.031 4.36 12.914 10.242 12.914h4.195c-4.242-3.093-6.187-7.781-6.094-13.148c.07-5.953 2.391-10.196 4.454-12.774h-3.446c-5.273 0-9.351 5.72-9.351 13.008"
      />
    </svg>
  );
}