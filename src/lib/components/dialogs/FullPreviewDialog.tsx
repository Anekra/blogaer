import React, { JSX, useMemo } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact
} from 'slate-react';
import { Descendant, createEditor } from 'slate';
import { WysiwygType } from '../../utils/enums';
import { CustomElement } from '../../slate';
export default function FullPreviewDialog({
  content,
  renderElement,
  renderLeaf
}: {
  content: Descendant[];
  renderElement?: (props: RenderElementProps) => JSX.Element;
  renderLeaf?: (props: RenderLeafProps) => JSX.Element;
}) {
  const editor = useMemo(() => withReact(createEditor()), []);
  return (
    <Dialog>
      <DialogTrigger asChild className="hv-bright text-primary-foreground">
        <button>Open in dialog</button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[95vh] max-w-[95vw] gap-4 overflow-y-auto">
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
      </DialogContent>
    </Dialog>
  );
}
