'use client';
import getFetch from '@/lib/actions/client/getFetch';
import useViewConfig from '@/lib/hooks/useViewConfig';
import { CustomElement } from '@/lib/types/slate';
import { GetPostById } from '@/lib/types/dto/GetPostById';
import { WysiwygType } from '@/lib/utils/enums';
import { getSlugOrIdFromPath } from '@/lib/utils/helper';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';
import { createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import useSWRImmutable from 'swr/immutable';
import LikeIt from '../icons/thoughts/LikeIt';
import TotalReadsIcon from '../icons/TotalReadsIcon';
import ThoughtsIcon from '../icons/thoughts/ThoughtsIcon';
import CommentsIcon from '../icons/CommentsIcon';
import ReadsIcon from '../icons/ReadsIcon';

export default function PostView() {
  const editor = useMemo(() => withReact(createEditor()), []);
  const { renderElement, renderLeaf } = useViewConfig(editor);
  const slug = getSlugOrIdFromPath(usePathname());
  const url = `${process.env.NEXT_PUBLIC_API_ROUTE}/post/public/${slug}`;
  const {
    data: res,
    error,
    isLoading
  } = useSWRImmutable<GetPostById>(url, getFetch);

  if (isLoading) return <p>loading...</p>;
  if (!res || error) return <p>error</p>;

  const post = res.data;
  const content = post.content;
  const username = post.username;

  return (
    <div className="flex w-full justify-between gap-16">
      <aside className="max-w-[200px]">
        <div
          className="neu-base-l relative mt-2 flex h-[240px] w-[200px] flex-col items-center gap-4 rounded-3xl"
          style={{ viewTransitionName: `profile-${slug}` }}
        >
          <div className="absolute h-full w-full overflow-hidden rounded-3xl brightness-50">
            <Image
              src="/profile1.jpeg"
              alt="Profile"
              width={200}
              height={100}
              priority={false}
              className="h-full w-full rounded-3xl object-cover"
            />
          </div>
          <div className="neu-base absolute bottom-0 flex w-full flex-col items-center gap-2 rounded-3xl bg-primary/90 py-2 pb-8 text-primary-foreground">
            <p className="text-xl font-bold">{username}</p>
            <div className="flex w-full justify-evenly gap-2 [&>*]:flex [&>*]:items-center [&>*]:gap-2">
              <span className="flex">
                <LikeIt /> 12
              </span>
              <span className="flex">
                <TotalReadsIcon /> 6
              </span>
            </div>
            <button className="btn-border-p absolute -bottom-5">Follow</button>
          </div>
        </div>
      </aside>
      <article className="w-full pe-4">
        <div className="mb-6 flex items-center justify-between gap-4 text-sm text-neutral-600 dark:text-neutral-400">
          <div className="flex gap-4">
            <span
              data-text="Thoughts"
              className="tt-info flex items-center gap-1"
            >
              <ThoughtsIcon className="h-6 w-6" />0
            </span>
            <span
              data-text="Comments"
              className="tt-info flex items-center gap-1"
            >
              <CommentsIcon className="h-6 w-6" />0
            </span>
            <span data-text="Reads" className="tt-info flex items-center gap-1">
              <ReadsIcon className="h-6 w-6" />0
            </span>
          </div>
          <p>3 July 2024 ○ 7 minutes reads</p>
        </div>
        <Slate editor={editor} initialValue={content}>
          <Editable
            readOnly
            renderElement={(props) => renderElement(props, editor, post.tags)}
            renderLeaf={renderLeaf}
            className="pointer-events-none flex w-full max-w-[65vw] flex-col gap-6 self-center"
          />
        </Slate>
      </article>
      <aside className="flex min-w-[200px] max-w-[200px] pt-8 text-sm">
        <ul>
          {content
            .filter((n) => n.type === WysiwygType.Heading)
            .map((n, i) => (
              <li
                key={i}
                className="border-l-4 border-primary-foreground px-4 py-1"
              >
                {(n as CustomElement).children[0].text}
              </li>
            ))}
        </ul>
      </aside>
    </div>
  );
}
