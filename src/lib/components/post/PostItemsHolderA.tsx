'use client';
import React from 'react';
import getPostsByPage from '../../actions/client/getPostsByPage';
import PostGridItemB from './PostGridItemB';
import { usePathname } from 'next/navigation';
import PostGridItemA from './PostGridItemA';
import useSWRImmutable from 'swr/immutable';
import { GetPostsByPage } from '@/lib/types/GetPostsByPage';

export default function PostItemsHolderA() {
  const currentPath = usePathname();
  const url = `${process.env.NEXT_PUBLIC_API_ROUTE}/post/public?pageNum=1&pageSize=10`;
  const {
    data: res,
    error,
    isLoading
  } = useSWRImmutable<GetPostsByPage>(url, getPostsByPage, {
    loadingTimeout: 5000,
    shouldRetryOnError: false
  });

  if (isLoading) return <p>loading...</p>;
  if (!res || error) return <p>error: {JSON.stringify(error.toString())}</p>;
  if (res.data.totalPosts === 0) return <p>No data found.</p>;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 ml:grid-cols-3">
      {res.data.posts.map((post, i) => {
        return currentPath === '/' ? (
          <PostGridItemA key={i} post={post} />
        ) : (
          <PostGridItemB key={i} post={post} />
        );
      })}
    </div>
  );
}
