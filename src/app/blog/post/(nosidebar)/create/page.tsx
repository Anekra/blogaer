import React from 'react';
import PostEditor from '@/lib/components/post/PostEditor';

export default function CreatePostPage() {
  return (
    <main className="flex justify-center gap-6 pb-6 pt-24">
      <PostEditor />
    </main>
  );
}
