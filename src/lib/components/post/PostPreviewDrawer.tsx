import React, { useMemo } from 'react';
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Editable, Slate, withReact } from 'slate-react';
import { createEditor } from 'slate';
import { useContent } from '@/lib/contexts/ContentContext';
import useViewConfig from '@/lib/hooks/useViewConfig';
import { useLoading } from '@/lib/contexts/LoadingContext';
import FullPreviewDialog from '@/lib/components/dialogs/FullPreviewDialog';
import Link from 'next/link';
import postFetch from '@/lib/actions/client/postFetch';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/lib/components/icons/LoadingSpinner';
import { useSession } from '@/lib/contexts/SessionContext';
import { useToast } from '../ui/use-toast';
import PostTags from './PostTags';
import { generateId, getTotalWords } from '@/lib/utils/helper';

export default function PostPreviewDrawer() {
  const { session } = useSession();
  const router = useRouter();
  const { isLoading, setLoading } = useLoading();
  const editor = useMemo(() => withReact(createEditor()), []);
  const { renderElement, renderLeaf } = useViewConfig(editor);
  const { content } = useContent();
  const { tags } = useContent();
  const { toast } = useToast();
  const words = getTotalWords(content);
  const publishPost = async () => {
    const username = session?.username;
    if (!username) return;
    setLoading(true);
    const id = generateId();
    const title = `${content[0].children[0].text}`;
    const res = await postFetch({ id, title, content, tags }, 'post');
    if (res) {
      router.push(
        `/blog/${username.toLowerCase()}/${title
          .replace(/\s+/g, '-')
          .toLowerCase()}-${id}`
      );
      toast({
        title: res.message,
        duration: 3000,
        className: 'toast-base'
      });
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="btn-solid-p">Preview</button>
      </DrawerTrigger>
      <DrawerContent className="focus:outline-none">
        <div className="flex h-3/4 max-h-[85vh] flex-col justify-center gap-6 overflow-y-auto px-12 pb-16 pt-8 md:flex-row">
          <div className="flex flex-1 flex-col gap-4">
            <span className="flex items-center gap-2 text-2xl font-bold">
              <Icon icon="carbon:data-view-alt" className="text-2xl" />
              Preview
            </span>
            <div className="flex max-h-[60vh] flex-col gap-4 overflow-y-auto">
              <div className="flex flex-col gap-2 overflow-y-auto rounded border-[1px]">
                <Slate editor={editor} initialValue={content.slice(0, 3)}>
                  <Editable
                    readOnly
                    placeholder="Type something..."
                    renderElement={(props) => renderElement(props, editor)}
                    renderLeaf={renderLeaf}
                    className="pointer-events-none flex flex-col gap-2 p-1"
                  />
                </Slate>
                {content.length > 3 && (
                  <span className="text-foreground/50">
                    And
                    {content.length - 3 === 1
                      ? ` ${content.length - 3} element more`
                      : ` ${content.length - 3} elements more`}
                  </span>
                )}
              </div>
              <p className="text-sm">{`A total of ${words} words`}</p>
            </div>
            <hr />
            <div className="flex gap-2">
              <FullPreviewDialog
                content={content}
                renderElement={(props) => renderElement(props, editor)}
                renderLeaf={renderLeaf}
              />
              <Link
                href="/blog/post/preview"
                target="_blank"
                className="border-s-2 border-foreground/40 ps-2 text-primary-foreground"
              >
                Open in new tab
              </Link>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <span className="flex items-center gap-2 text-2xl font-bold">
              <Icon icon="tabler:tags" className="text-[28px]" />
              Tags
            </span>
            <PostTags />
            <hr />
            <button
              className="flex w-fit gap-2 rounded-xl bg-primary-foreground px-4 py-2 font-bold text-primary"
              onClick={publishPost}
            >
              Publish
              {isLoading && <LoadingSpinner />}
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
