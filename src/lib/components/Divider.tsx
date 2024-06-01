import React from 'react';
import { CustomElement } from '../slate';
import { useSlate } from 'slate-react';
import { getPath, selectElement } from '../utils/helper';

export default function Divider({
  children,
  element
}: {
  children: any;
  element: CustomElement;
}) {
  const editor = useSlate();
  const path = getPath(editor, element);
  const isSelected =
    !!path && editor.selection?.anchor.path.slice(0, 1).join() === path?.join();

  return (
    <div
      className={`${
        isSelected
          ? 'rounded border border-dashed border-primary-foreground'
          : ''
      } flex h-20 items-center`}
      onMouseDown={(e) => {
        e.preventDefault();
        if (path) selectElement(editor, path);
      }}
      contentEditable={false}
    >
      <hr className="h-2 w-full border-transparent bg-gradient-to-r from-background via-foreground to-background" />
      <span className="hidden">{children}</span>
    </div>
  );
}
