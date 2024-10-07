import Link from 'next/link';
import React from 'react';
import { RenderElementProps } from 'slate-react';

export default function PostLink({
  attributes,
  children,
  element
}: RenderElementProps) {
  return (
    <Link
      {...attributes}
      href={element.url}
      className="text-cyan-600 underline"
      onClick={(e) => {
        e.preventDefault();
        if (e.ctrlKey) window.open(element.url, '_blank');
      }}
    >
      {children}
    </Link>
  );
}
