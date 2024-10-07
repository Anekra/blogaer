'use client';
import { useSession } from '@/lib/contexts/SessionContext';
import { Post } from '@/lib/types/dto/Post';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React from 'react';
import Logo2Icon from '../icons/Logo2Icon';

export default function PostGridCardB({ post }: { post: Post }) {
  const { session } = useSession();
  const username = post.username;
  const thumbnail = post.content
    .filter((content) => content.type === 'image')
    .at(0);
  const date = new Date(post.createdAt).toDateString();
  const tags = post.tags;
  const title = post.title;
  const slug = `${title.replaceAll(' ', '-').toLowerCase()}-${post.id}`;
  const url = `/blog/${username.toLowerCase()}/${slug}`;

  return (
    <div className="neu-base group relative flex h-[320px] max-h-[350px] max-w-[480px] flex-col overflow-hidden rounded-md">
      <div className="absolute z-[1] flex h-[80px] w-full items-center justify-center bg-background px-12 py-2 text-center transition-[background-color_height] group-hover:h-full group-hover:bg-background/60 group-hover:px-4">
        <Link href={url}>
          <h4 className="truncate-2 rounded box-decoration-clone text-[18px] font-bold group-hover:line-clamp-3 group-hover:inline group-hover:text-ellipsis group-hover:bg-foreground/10 group-hover:px-2 group-hover:text-3xl ml:text-[22px]">
            {title}
          </h4>
        </Link>
        {session != null && (
          <Icon
            icon="iconamoon:bookmark-fill"
            className="absolute right-4 top-7 text-2xl"
          />
        )}
      </div>
      <div className="absolute bottom-0 h-3/4 w-full overflow-hidden transition-[height] group-hover:h-full">
        <Link href={url}>
          {thumbnail ? (
            <div className="relative h-full w-full">
              <Image
                src={thumbnail.imageLink}
                alt={thumbnail.imageAlt}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-card">
              <Logo2Icon />
            </div>
          )}
        </Link>
        <div className="absolute bottom-0 z-[1] w-full bg-black/60 px-2 py-1 text-white transition-[background-color_height] group-hover:bg-transparent group-hover:text-black dark:text-white dark:group-hover:text-white">
          <div className="flex justify-between gap-2">
            <Icon
              icon="iconamoon:profile-circle-fill"
              className="text-[44px]"
            />
            <div className="flex grow flex-col">
              <p className="font-bold">{username}</p>
              <p className="text-[13px]">{date}</p>
            </div>
          </div>
          <div className="line-clamp-2 flex flex-wrap justify-center gap-x-2 px-4 py-1 text-xs">
            {tags.map((tag, i) => {
              return <p key={i}>#{tag}</p>;
            })}
          </div>
          <div className="flex justify-between gap-3 px-1 text-xs">
            <div className="flex gap-3">
              <p>🔥10</p>
              <p>🗨️2</p>
            </div>
            <p>5 minutes read</p>
          </div>
        </div>
      </div>
    </div>
  );
}
