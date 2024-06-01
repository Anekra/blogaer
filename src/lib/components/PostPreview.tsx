'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { WysiwygType } from '../enums';
import { CustomElement } from '../slate';
import { useContent } from '../contexts/ContentContext';
import usePreviewConfig from '../hooks/usePreviewConfig';

export default function PostPreview() {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [isMounted, setIsMounted] = useState(false);
  const [content, setContent] = useContent();
  const { renderElement, renderLeaf } = usePreviewConfig(editor);

  useEffect(() => {
    if (
      typeof localStorage !== 'undefined' &&
      localStorage.getItem('content') != null
    ) {
      setContent(JSON.parse(localStorage.getItem('content') as string));
    }
    setIsMounted(true);
  }, [setContent]);

  if (isMounted) {
    return (
      <div className="flex w-full gap-6">
        <aside className="w-3/12"></aside>
        <article className="w-full">
          <Slate editor={editor} initialValue={content}>
            <Editable
              readOnly
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              className="pointer-events-none flex w-full max-w-[65vw] flex-col gap-2 self-center"
            />
          </Slate>
        </article>
        <aside className="w-3/12 pe-4 pt-8">
          <ul>
            {content
              .filter((n) => n.type === WysiwygType.Heading)
              .map((n, i) => (
                <li
                  key={i}
                  className="border-l-4 border-primary-foreground px-4 py-1"
                >
                  {(n as CustomElement).children[0].text}
                </li>
              ))}
          </ul>
        </aside>
      </div>
    );
  }
}
