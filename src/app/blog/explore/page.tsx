import CategoryTabs from '@/lib/components/filters/CategoryTabs';
import PostItemsHolderA from '@/lib/components/post/PostItemsHolderA';
import React from 'react';

export default function ExplorePage() {
  return (
    <main className="flex w-full max-w-screen-xl flex-col gap-6 px-6 pb-6 pt-20">
      <CategoryTabs />
      <PostItemsHolderA />
    </main>
  );
}
