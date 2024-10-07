'use client';
import React, { useEffect } from 'react';
import getFetch from '@/lib/actions/client/getFetch';
import PostGridCardC from './PostGridCardC';
import { GetPostsByUserId } from '@/lib/types/dto/GetPostsByUserId';
import useSWRImmutable from 'swr/immutable';
import { useCurrentPosts } from '@/lib/contexts/PostsContext';

export default function PostCardsHolderB({ url }: { url: string }) {
  const { currentPosts, setCurrentPosts } = useCurrentPosts();
  const { data: res, error } = useSWRImmutable<GetPostsByUserId>(
    url,
    (url: string) => getFetch(url)
  );

  useEffect(() => {
    if (!res) return;
    if (res.data.posts.length > 0) setCurrentPosts(res.data.posts);
  }, [res, setCurrentPosts]);

  if (!res) return <p>loading...</p>;
  if (error) return <p>error</p>;
  if (res.data.totalPosts === 0) return <p>No data found.</p>;

  return (
    <div className="grid w-full auto-rows-fr grid-cols-1 gap-4 ms:grid-cols-2 ql:grid-cols-3">
      {currentPosts.map((post, i) => {
        return <PostGridCardC key={i} postData={{ post, postIndex: i }} />;
      })}
    </div>
  );
}
