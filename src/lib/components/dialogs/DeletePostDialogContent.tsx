import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '../ui/dialog';
import React from 'react';
import { useCurrentPosts } from '@/lib/contexts/PostsContext';
import deleteFetch from '@/lib/actions/client/deleteFetch';
import { useToast } from '../ui/use-toast';
import { usePathname } from 'next/navigation';

export default function DeletePostDialogContent({
  postIndex
}: {
  postIndex: number;
}) {
  const { currentPosts, setCurrentPosts } = useCurrentPosts();
  const selectedPost = currentPosts[postIndex];
  const slugOrId = selectedPost.id;
  const currentPath = usePathname();
  const isDraft = currentPath.startsWith('/blog/post/draft');
  const { toast } = useToast();

  return (
    <DialogContent className="flex w-fit flex-col gap-8 px-12 py-10">
      <DialogTitle>Delete Post</DialogTitle>
      <DialogDescription>
        Are you sure you want to delete this post? <br /> (This action cannot be
        undone)
      </DialogDescription>
      <div className="flex justify-center gap-8">
        <DialogClose className="btn-outline-base outline-none">
          Cancel
        </DialogClose>
        <DialogClose
          onClick={async () => {
            await deleteFetch(slugOrId, isDraft ? 'draft' : 'post');
            toast({
              title: 'Deleting post',
              duration: 1500,
              className: 'toast-base',
              onAnimationEndCapture: (e) => {
                if (e.animationName === 'exit') {
                  setCurrentPosts((posts) =>
                    posts.filter((_, i) => i !== postIndex)
                  );
                }
              }
            });
          }}
          className="btn-solid-p rounded bg-primary px-6 py-2"
        >
          Delete
        </DialogClose>
      </div>
    </DialogContent>
  );
}