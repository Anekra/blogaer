import { Post } from '@/lib/types/Post';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React from 'react';

export default function PostGridItemA({ post }: { post: Post }) {
  if (!post.username) return <p>post not found</p>
  const username = post.username;
  const title = post.title.split(' b')[0];
  const date = new Date(post.createdAt).toDateString();
  const url = `/blog/${username.toLowerCase()}/${post.title
    .replace(/\s+/g, '-')
    .toLowerCase()}`;
  return (
    <Link
      href={url}
      className="relative flex max-h-[160px] flex-col rounded-lg sm:max-w-[360px]"
    >
      <div className="z-[1] flex h-[160px] w-3/4 flex-col gap-3 rounded-lg bg-card p-3 ">
        <div className="absolute left-0 top-0 h-11 w-11 overflow-hidden rounded-br-lg rounded-tl-lg">
          <Image src="/profile1.jpeg" alt="Profile" width={200} height={100} />
        </div>
        <div className="flex grow flex-col gap-4">
          <p className="line-clamp-1 ps-12">{username}</p>
          <p className="line-clamp-2 text-xl font-bold">{title}</p>
        </div>
        <p className="text-xs text-foreground/40">{date}</p>
      </div>
      <div className="absolute right-2 top-0 w-1/4 overflow-hidden rounded-r-lg">
        <Image
          src="/blog_cover_1.jpg"
          alt="Story"
          className="h-[160px] w-full object-cover object-left"
          width={200}
          height={300}
        />
      </div>
    </Link>
  );
}
