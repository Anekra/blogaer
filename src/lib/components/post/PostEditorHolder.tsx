'use client';
import React from 'react';
import PostEditor from './PostEditor';
import useSWRImmutable from 'swr/immutable';
import { GetPostByTitle } from '@/lib/types/GetPostByTitle';
import { usePathname } from 'next/navigation';
import { getLastPathName } from '@/lib/utils/helper';
import getPostByTitle from '@/lib/actions/client/getPostByTitle';

export default function PostEditorHolder() {
  const postTitle = getLastPathName(usePathname());
  const url = `${process.env.NEXT_PUBLIC_API_ROUTE}/post/public/${postTitle}`;
  const { data: res, error } = useSWRImmutable<GetPostByTitle>(
    url,
    getPostByTitle
  );

  if (!res) return <p>loading...</p>;
  if (error) return <p>error</p>;

  return <PostEditor post={res.data.content} />;
}
