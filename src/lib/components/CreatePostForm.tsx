'use client';

import React, { useMemo, useState } from 'react';
import PostEditor from './PostEditor';
import { HeadingSize, WysiwygAlign, WysiwygType } from '../enums';
import { useSession } from 'next-auth/react';

export default function CreateStoryForm() {
  const session = useSession();
  const initialValue = useMemo(() => {
    if (window !== undefined && localStorage.getItem('content') != null)
      return JSON.parse(localStorage.getItem('content') as string);
    else
      return [
        {
          type: WysiwygType.Heading,
          children: [{ text: '' }],
          align: WysiwygAlign.Left,
          headingSize: HeadingSize.H1
        }
      ];
  }, []);
  const [document, setDocument] = useState(initialValue);
  if (session?.status === 'loading') {
    return <p>Loading...</p>;
  }
  if (session?.status === 'unauthenticated') {
    return <p>Access denied</p>;
  }

  return (
    <section className="flex justify-center gap-6 pb-6 pt-24">
      <PostEditor document={document} onChange={setDocument} />
    </section>
  );
}
