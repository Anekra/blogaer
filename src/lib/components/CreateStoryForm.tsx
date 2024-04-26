'use client';

import React, { useState } from 'react';
import StoryEditor from './StoryEditor';
import { Descendant } from 'slate';
import { HeadingSize, WysiwygAlign, WysiwygType } from '../enums';
// import { useSession } from 'next-auth/react';

const initialState = [
  {
    type: WysiwygType.Heading,
    children: [{ text: 'abc' }],
    align: WysiwygAlign.Left,
    headingSize: HeadingSize.H1
  }
] as Descendant[];

export default function CreateStoryForm() {
  const [document, setDocument] = useState(
    // (typeof window !== 'undefined' && localStorage.getItem('content')
    //   ? JSON.parse(localStorage.getItem('content') as string)
    //   :
    initialState
    // ) as Descendant[]
  );

  // const session = useSession();
  // console.log(session?.status);
  // if (session?.status === 'loading') {
  //   return <p className='pt-20'>Loading...</p>;
  // }
  // if (session?.status === 'unauthenticated') {
  //   return <p className='pt-20'>Access denied</p>;
  // }

  return (
    <section className="flex justify-center gap-6 pt-24">
      <StoryEditor document={document} onChange={setDocument} />
    </section>
  );
}