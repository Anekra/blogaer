'use client';
import React from 'react';
import getPostsByUserId from '@/lib/actions/client/getPostsByUserId';
import PostGridItemC from './PostGridItemC';
import { GetPostsByUserId } from '@/lib/types/GetPostsByUserId';
import useSWRImmutable from 'swr/immutable';

export default function PostItemsHolderB() {
  const url = `${process.env.NEXT_PUBLIC_API_ROUTE}/post/user?pageNum=1&pageSize=10`;
  const { data: res, error } = useSWRImmutable<GetPostsByUserId>(
    url,
    (url: string) => getPostsByUserId(url)
  );

  if (!res) return <p>loading...</p>;
  if (error) return <p>error</p>;
  if (res.data.totalPosts === 0) return <p>No data found.</p>;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 ml:grid-cols-3">
      {res.data.posts.map((post, i) => {
        return <PostGridItemC key={i} post={post} />;
      })}
    </div>
  );
}
