'use client';

import React, { useMemo, useState } from 'react';
import StoryEditor from './StoryEditor';
import { HeadingSize, WysiwygAlign, WysiwygType } from '../enums';
import { useSession } from 'next-auth/react';

export default function CreateStoryForm() {
  const session = useSession();
  console.log(session?.status);
  const initialValue = useMemo(() => {
    if (window !== undefined)
      return JSON.parse(window.localStorage.getItem('content') as string);
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
    return <p className='pt-20'>Loading...</p>;
  }
  if (session?.status === 'unauthenticated') {
    return <p className='pt-20'>Access denied</p>;
  }

  return (
    <section className="flex justify-center gap-6 pb-6 pt-24">
      <StoryEditor document={document} onChange={setDocument} />
    </section>
  );
}
