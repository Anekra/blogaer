'use client';
import React from 'react';
import getFetch from '../../actions/client/getFetch';
import PostGridCardB from './PostGridCardB';
import { usePathname } from 'next/navigation';
import PostGridCardA from './PostGridCardA';
import useSWRImmutable from 'swr/immutable';
import { GetPostsByPage } from '@/lib/types/dto/GetPostsByPage';

export default function PostCardsHolderA() {
  const currentPath = usePathname();
  const url = `${process.env.NEXT_PUBLIC_API_ROUTE}/post/public?pageNum=1&pageSize=10`;
  const {
    data: res,
    error,
    isLoading
  } = useSWRImmutable<GetPostsByPage>(url, getFetch, {
    loadingTimeout: 5000,
    shouldRetryOnError: false
  });

  if (isLoading) return <p>loading...</p>;
  if (!res || error) return <p>error: {JSON.stringify(error.toString())}</p>;
  if (res.data.totalPosts === 0) return <p>No data found.</p>;

  return (
    <div
      className={`grid w-full auto-rows-fr grid-cols-1 gap-4${
        currentPath === '/'
          ? ' ml:grid-cols-2 xl:grid-cols-3'
          : ' ms:grid-cols-2 ql:grid-cols-3'
      }`}
    >
      {res.data.posts.map((post, i) => {
        return currentPath === '/' ? (
          <PostGridCardA key={i} post={post} />
        ) : (
          <PostGridCardB key={i} post={post} />
        );
      })}
    </div>
  );
}
