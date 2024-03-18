'use client';

import React, { useState } from 'react';
import StoryEditor from './StoryEditor';
import { Descendant } from 'slate';
import { HeadingSize, WysiwygAlign, WysiwygType } from '../enums';
import { useSession } from 'next-auth/react';

const initialState = [
  {
    type: WysiwygType.Heading,
    children: [{ text: '' }],
    align: WysiwygAlign.Left,
    headingSize: HeadingSize.ExtraLarge
  }
];

export default function CreateStoryForm() {
  const [document, setDocument] = useState(
    (typeof window !== 'undefined' && localStorage.getItem('content')
      ? JSON.parse(localStorage.getItem('content') as string)
      : initialState) as Descendant[]
  );

  const session = useSession();
  console.log(session?.status);
  if (session?.status === 'loading') {
    return <p className='pt-20'>Loading...</p>;
  }
  if (session?.status === 'unauthenticated') {
    return <p className='pt-20'>Access denied</p>;
  }

  return (
    <section className="flex justify-center gap-6 pt-16">
      <StoryEditor document={document as Descendant[]} onChange={setDocument} />
    </section>
  );
}
