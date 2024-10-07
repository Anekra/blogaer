import patchFetch from '@/lib/actions/client/patchFetch';
import { useContent } from '@/lib/contexts/ContentContext';
import { getSlugOrIdFromPath } from '@/lib/utils/helper';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useToast } from '../ui/use-toast';

export default function SaveAndPublishBtn() {
  const { content, tags } = useContent();
  const slug = getSlugOrIdFromPath(usePathname());
  const title = `${content[0].children[0].text}`;
  const { toast } = useToast();
  const handleEditPost = async () => {
    const response = await patchFetch(
      { slugOrId: slug, title, content, tags },
      'post'
    );
    if (response.message) {
      toast({
        title: response.message,
        duration: 3000,
        className: 'toast-base'
      });
    }
  };
  return (
    <button className="btn-solid-p" onClick={handleEditPost}>
      Save & Publish
    </button>
  );
}
