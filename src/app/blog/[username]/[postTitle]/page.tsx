import PostView from '@/lib/components/post/PostView';
import React from 'react';

export default function BlogPostPage() {
  return (
    <main className="flex w-full max-w-screen-2xl flex-col gap-6 px-6 pb-6 pt-8">
      <PostView />
    </main>
  );
}
