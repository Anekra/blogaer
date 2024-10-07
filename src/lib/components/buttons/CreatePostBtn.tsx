import React from 'react';
import { Link } from 'next-view-transitions';

export default function CreatePostBtn() {
  return (
    <Link href="/blog/post/create">
      <button className="btn-solid-p"><span>Create Post</span></button>
    </Link>
  );
}
