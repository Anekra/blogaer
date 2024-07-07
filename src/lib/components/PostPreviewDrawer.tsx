import React, { useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Editable, Slate, withReact } from 'slate-react';
import { Node, createEditor } from 'slate';
import { useContent } from '../contexts/ContentContext';
import usePreviewConfig from '../hooks/usePreviewConfig';
import FullPreviewDialog from './FullPreviewDialog';
import Link from 'next/link';
import publishPost from '../actions/client/addPost';

export default function PostPreviewDrawer() {
  const session = useSession();
  const editor = useMemo(() => withReact(createEditor()), []);
  const { renderElement, renderLeaf } = usePreviewConfig(editor);
  const [content] = useContent();
  const [tags, setTags] = useState<string[]>([]);
  const [tagsLength, setTagsLength] = useState(0);
  const insertTagUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputEl = e.target as HTMLInputElement;
    const tag = inputEl.value.trim();
    const newTags = tag
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0 && t !== '' && !tags.includes(t));
    setTagsLength(tags.length + newTags.length);

    if (e.key === 'Enter') {
      if (newTags.length > 0) {
        setTags([...tags, ...newTags]);
      }
      inputEl.value = '';
    }
  };
  const insertTagDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (tagsLength >= 10 && e.key === ',') {
      e.preventDefault();
    }
  };
  const clearTags = () => {
    setTags([]);
    setTagsLength(0);
  };
  const deleteTag = (i: number) => {
    setTags(tags.filter((_, index) => index !== i));
    setTagsLength((prevLength) => prevLength - 1);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="rounded-lg bg-primary-foreground px-2 py-1 font-extrabold text-primary hover:brightness-150 active:border-secondary active:bg-secondary active:text-primary-foreground dark:hover:brightness-125">
          Preview
        </button>
      </DrawerTrigger>
      <DrawerContent className="focus:outline-none">
        <div className="flex h-3/4 max-h-[85vh] justify-center gap-6 px-12 pb-16 pt-8">
          <div className="flex flex-1 flex-col gap-4">
            <span className="flex items-center gap-2 text-2xl font-bold">
              <Icon icon="carbon:data-view-alt" className="text-2xl" />
              Preview
            </span>
            <div className="flex max-h-[60vh] flex-col gap-2 overflow-y-auto">
              <div className="flex flex-col gap-2 overflow-y-auto rounded border-[1px]">
                <Slate editor={editor} initialValue={content.slice(0, 3)}>
                  <Editable
                    readOnly
                    placeholder="Type something..."
                    renderElement={renderElement}
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
              <span className="text-sm">
                {content.map((n) => Node.string(n).split(/\s+/).length)} words
                total
              </span>
              <hr />
            </div>
            <div className="flex gap-2">
              <FullPreviewDialog
                content={content}
                renderElement={renderElement}
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
            <div className="flex flex-col gap-2">
              <span>
                Press enter to insert a tag, add comma after each tag to insert
                multiple tags
              </span>
              <div className="relative flex flex-col gap-2 rounded border-[1px] p-2 pb-8">
                <ul className="flex flex-wrap gap-2">
                  {tags.map((tag, i) => (
                    <li
                      key={i}
                      className="flex w-fit items-center justify-center gap-2 rounded bg-accent px-2 py-1 text-primary-foreground"
                    >
                      {tag}
                      <button
                        className="rounded-3xl text-foreground/50 hover:text-red-500"
                        onClick={() => deleteTag(i)}
                      >
                        🗙
                      </button>
                    </li>
                  ))}
                </ul>
                {tags.length < 10 && (
                  <input
                    type="text"
                    placeholder="Insert tag..."
                    className="w-fit rounded bg-accent p-2"
                    onKeyUp={insertTagUp}
                    onKeyDown={insertTagDown}
                  />
                )}
                <button
                  className="absolute bottom-0 right-0 p-2 text-sm text-foreground/50 enabled:hover:text-red-700"
                  disabled={tags.length === 0}
                  onClick={clearTags}
                >
                  Clear all
                </button>
              </div>
              <span>{10 - tagsLength} tags remaining</span>
              <hr />
            </div>
            <button
              className="w-fit rounded-xl bg-primary-foreground px-4 py-2 font-bold text-primary"
              onClick={() =>
                // console.log({ content, tags }, session.data?.sessionToken)
                publishPost({ content, tags }, session.data?.sessionToken)
              }
            >
              Publish
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
