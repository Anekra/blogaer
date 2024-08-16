'use client';
import getPostByTitle from '@/lib/actions/client/getPostByTitle';
import useViewConfig from '@/lib/hooks/useViewConfig';
import { CustomElement } from '@/lib/slate';
import { GetPostByTitle } from '@/lib/types/GetPostByTitle';
import { WysiwygType } from '@/lib/utils/enums';
import { getLastPathName } from '@/lib/utils/helper';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';
import { createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import useSWRImmutable from 'swr/immutable';

export default function PostView() {
  const editor = useMemo(() => withReact(createEditor()), []);
  const { renderElement, renderLeaf } = useViewConfig(editor);
  const postTitle = getLastPathName(usePathname());
  const url = `${process.env.NEXT_PUBLIC_API_ROUTE}/post/public/${postTitle}`;
  const { data: res, error } = useSWRImmutable<GetPostByTitle>(
    url,
    getPostByTitle
  );

  if (!res) return <p>loading...</p>;
  if (error) return <p>error</p>;

  console.log(res.data);
  const content = res.data.content;
  const username = res.data.username;

  return (
    <div className="flex w-full justify-between gap-16">
      <aside className="min-w-[200px] max-w-[200px]">
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 overflow-hidden rounded-3xl">
            <Image
              src="/profile1.jpeg"
              alt="Profile"
              width={200}
              height={100}
            />
          </div>
          <div>
            <p className="text-3xl font-bold">{username}</p>
          </div>
          <div><button className="btn-s-solid-a">View Profile</button></div>
        </div>
      </aside>
      <article className="w-full pe-4">
        <Slate editor={editor} initialValue={content}>
          <Editable
            readOnly
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            className="pointer-events-none flex w-full max-w-[65vw] flex-col gap-2 self-center"
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
