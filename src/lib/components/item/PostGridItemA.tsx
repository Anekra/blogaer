import Image from 'next/image';
import React from 'react';

export default function PostGridItemA() {
  return (
    <div className="relative flex max-h-[160px] max-w-[320px] flex-col rounded-lg ">
      <div className="z-[1] flex h-[160px] max-w-[210px] grow flex-col gap-3 rounded-lg bg-accent p-3">
        <div className="absolute left-0 top-0 h-11 w-11 overflow-hidden rounded-br-lg rounded-tl-lg">
          <Image src="/profile1.jpeg" alt="Profile" width={200} height={100} />
        </div>
        <div className="flex grow flex-col gap-4">
          <p className="line-clamp-1 ps-12">Writer&#39;s Name username</p>
          <p className="line-clamp-2 text-xl font-bold">
            Story Title Story Title Story Title Story Title Story Title Story
            Title Story Title Story Title
          </p>
        </div>
        <p className="text-xs text-foreground/40">11 Nov 2023</p>
      </div>
      <div className="absolute right-0 top-0 overflow-hidden rounded-r-lg">
        <Image
          src="/blog_cover_1.jpg"
          alt="Story"
          className="h-[160px] w-[120px] object-cover object-left"
          width={200}
          height={300}
        />
      </div>
    </div>
  );
}
