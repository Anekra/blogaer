import React from 'react';
import { CustomElement } from '../slate';
import { useSlate } from 'slate-react';
import { selectElement } from '../utils/helper';

export default function Divider({
  children,
  element
}: {
  children: any;
  element: CustomElement;
}) {
  const editor = useSlate();
  const isSelected =
    editor.selection?.anchor.path.join() === element.position.join();
  return (
    <div
      className={`${
        isSelected ? 'rounded border border-dashed border-primary-foreground' : ''
      } flex h-20 items-center`}
      onMouseDown={(e) => {
        e.preventDefault();
        selectElement(editor, element.position);
      }}
      contentEditable={false}
    >
      <hr className="h-2 w-full border-transparent bg-gradient-to-r from-background via-foreground to-background" />
      <span className="hidden">{children}</span>
    </div>
  );
}
