'use client';
import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image';
import React from 'react';

export default function PostHolder() {
  return (
    <div className="flex w-[400px] flex-col rounded-md bg-lighter-background">
      <div className="flex items-center p-2">
        <h1 className="flex-1 text-center text-xl font-bold">
          Blog Post Title
        </h1>
        <Icon icon="iconamoon:bookmark-fill" className="text-2xl" />
      </div>
      <div>
        <Image
          src="https://source.unsplash.com/g5jpH62pwes"
          alt="Blog Post Thumbnail"
          width={400}
          height={200}
          className="h-[200px] w-[400px] object-cover"
        />
      </div>
      <div className="flex justify-between p-2 text-xs">
        <div className="flex gap-2">
          <Icon icon="iconamoon:profile-circle-fill" className="text-4xl" />
          <span className="flex flex-col justify-between">
            <p className="font-bold">Author username</p>
            <p>10-05-2024 17:31</p>
          </span>
        </div>
        <div className="flex flex-col items-end justify-between">
          <p>5 minutes read</p>
          <span className="flex gap-2">
            <p>❤👍️🔥… 5 reactions</p>
            <p>🗨️ 2 comments</p>
          </span>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-x-2 p-2 text-xs text-foreground/50">
        <p>#javascript</p>
        <p>#typescript</p>
        <p>#nextjs</p>
        <p>#reactjs</p>
        <p>#fullstack</p>
        <p>#web</p>
        <p>#development</p>
      </div>
    </div>
  );
}
