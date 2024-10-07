'use client';
import React from 'react';
import PostEditor from './PostEditor';
import useSWRImmutable from 'swr/immutable';
import { GetPostById } from '@/lib/types/dto/GetPostById';
import { usePathname } from 'next/navigation';
import { getSlugOrIdFromPath } from '@/lib/utils/helper';
import getFetch from '@/lib/actions/client/getFetch';
import PostTags from './PostTags';

export default function PostEditorHolder() {
  const currentPath = usePathname();
  const isDraft = currentPath.startsWith('/blog/post/edit/draft');
  const slugOrId = getSlugOrIdFromPath(currentPath);
  const url = `${process.env.NEXT_PUBLIC_API_ROUTE}/${
    isDraft ? 'draft' : 'post/public'
  }/${slugOrId}`;
  const { data: res, error } = useSWRImmutable<GetPostById>(url, getFetch);

  if (!res) return <p className="dots-loading">loading</p>;
  if (error) return <p>error</p>;

  return (
    <PostEditor post={res.data}>
      <PostTags />
    </PostEditor>
  );
}
