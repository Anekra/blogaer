'use client';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

export default function PostGridItemB() {
  const session = useSession();

  return (
    <div className="flex h-fit flex-col rounded-md bg-lighter-background">
      <div className="relative flex items-center justify-center p-2">
        <h1 className="text-center text-xl font-bold">Blog Post Title</h1>
        {session.data != null && (
          <Icon
            icon="iconamoon:bookmark-fill"
            className="absolute right-0 me-[6px] text-2xl"
          />
        )}
      </div>
      <div>
        <Image
          src="/blog_cover_1.jpg"
          alt="Blog Post Thumbnail"
          width={600}
          height={500}
          className="object-cover"
        />
      </div>
      <div className="flex justify-between gap-2 p-2">
        <Icon icon="iconamoon:profile-circle-fill" className="text-[44px]" />
        <div className="flex grow flex-col">
          <p className="font-bold">Author username</p>
          <p className="text-sm">10-05-2024 17:31</p>
        </div>
      </div>
      <div className="line-clamp-2 flex flex-wrap justify-center gap-x-2 px-4 pb-2 text-xs">
        <p>#typescript</p>
        <p>#nextjs</p>
        <p>#fullstack</p>
        <p>#web</p>
        <p>#development</p>
        <p>#development</p>
        <p>#development</p>
      </div>
      <div className="flex justify-between gap-3 px-4 pb-3 text-xs">
        <div className="flex gap-5">
          <p>❤👍️🔥<span className=""></span></p>
          <p>🗨️ 2</p>
        </div>
        <p>5 minutes read</p>
      </div>
    </div>
  );
}
