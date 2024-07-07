import CategoryTabs from '@/lib/components/CategoryTabs';
import PostGridItemB from '@/lib/components/item/PostGridItemB';
import React from 'react';

export default function ExplorePage() {
  return (
    <main className="flex flex-col gap-6 px-6 pb-6 pt-20">
      <CategoryTabs />
      <div className="grid grid-cols-1 justify-center gap-6 xs:grid-cols-2 xl:grid-cols-3">
        <PostGridItemB />
        <PostGridItemB />
        <PostGridItemB />
      </div>
    </main>
  );
}
