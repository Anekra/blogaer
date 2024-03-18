import React from 'react';
import { CustomElement } from '../slate';
import { useSlate } from 'slate-react';
import { selectBlock } from '../utils/editor';

export default function Divider({ element }: { element: CustomElement }) {
  const editor = useSlate();
  const isSelected =
    editor.selection?.anchor.path.join() === element.location.join();
  return (
    <div
      className={`${
        isSelected ? 'rounded border border-primary-foreground' : ''
      } flex h-20 w-full items-center `}
      onClick={() => selectBlock(editor, element.location)}
    >
      <hr
        className="divider w-full"
      />
    </div>
  );
}
