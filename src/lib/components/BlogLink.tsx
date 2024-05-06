import Link from 'next/link';
import React from 'react';
import { RenderElementProps } from 'slate-react';

export default function BlogLink({ props }: { props: RenderElementProps }) {
  const { children, element } = props;

  return (
    <Link
      {...props}
      href={element.url}
      className="text-cyan-600 hover:underline"
      onClick={(e) => {
        e.preventDefault();
        if (e.ctrlKey) window.open(element.url, '_blank');
      }}
    >
      {children}
    </Link>
  );
}
