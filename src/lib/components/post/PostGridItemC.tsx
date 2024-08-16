'use client';
import { PostWithNoUser } from '@/lib/types/Post';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function PostGridItemC({ post }: { post: PostWithNoUser }) {
  const title = post.title.split(' b')[0];
  const date = new Date(post.createdAt).toDateString();

  return (
    <Link
      href={`/blog/post/edit/${post.title.replace(/\s+/g, '-').toLowerCase()}`}
      className="flex h-fit flex-col gap-3 rounded-md"
    >
      <div className="overflow-hidden rounded-md">
        <Image
          src="/blog_cover_1.jpg"
          alt="Blog Post Thumbnail"
          width={600}
          height={500}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col px-1">
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="text-xs text-foreground/80">0 reads | {date}</p>
      </div>
    </Link>
  );
}
