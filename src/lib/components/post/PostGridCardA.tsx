import { Post } from '@/lib/types/dto/Post';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React from 'react';
import Logo2Icon from '../icons/Logo2Icon';

export default function PostGridCardA({ post }: { post: Post }) {
  const username = post.username;
  const title = post.title.split(' b')[0];
  const thumbnail = post.content
    .filter((content) => content.type === 'image')
    .at(0);
  const date = new Date(post.createdAt).toDateString();
  const slug = `${post.title.replaceAll(' ', '-').toLowerCase()}-${post.id}`;
  const url = `/blog/${username.toLowerCase()}/${slug}`;

  return (
    <Link
      href={url}
      className="neu-p group relative flex max-h-[200px] flex-col rounded-lg"
      style={{ viewTransitionName: `${slug}` }}
    >
      <div className="neu-p z-[1] flex h-[160px] w-3/4 flex-col gap-3 rounded-lg bg-card p-3 transition-[width_background-color_box-shadow] group-hover:w-full group-hover:bg-background/60 group-hover:shadow-none">
        <div className="absolute left-0 top-0 h-11 w-11 overflow-hidden rounded-br-lg rounded-tl-lg">
          <Image
            src="/profile1.jpeg"
            alt="Profile"
            width={50}
            height={50}
            unoptimized
          />
        </div>
        <div className="flex grow flex-col gap-4">
          <p className="line-clamp-1 ps-12">{username}</p>
          <p className="line-clamp-2 text-xl font-bold">{title}</p>
        </div>
        <p className="text-xs text-foreground/40">{date}</p>
      </div>
      <div className="absolute right-0 top-0 h-full max-h-[160px] w-[27%] overflow-hidden rounded-r-lg transition-[width] group-hover:w-full group-hover:rounded-lg">
        {thumbnail ? (
          <Image
            src={thumbnail.imageLink}
            alt={thumbnail.imageAlt}
            fill
            className="object-cover group-hover:rounded-lg"
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-accent/40">
            <Logo2Icon />
          </div>
        )}
      </div>
    </Link>
  );
}
