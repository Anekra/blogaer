import React from 'react';
import { CustomElement } from '../slate';
import { Input } from './ui/input';
import { selectBlock } from '../utils/editor';
import { useSlate } from 'slate-react';

export default function BlogImage({ element }: { element: CustomElement }) {
  const img = element.image;
  const editor = useSlate();
  if (!img) return;
  const isSelected =
    editor.selection?.anchor.path.join() === element.location.join();
  const imgWidth = `${element.dimensions.width > 200 ? element.dimensions.width : 200}px`;
  const imgHeight = `${element.dimensions.height > 200 ? element.dimensions.height : 200}px`;
  const format = element.format;

  return (
    <figure
      className={`${
        isSelected ? 'rounded border border-primary-foreground' : ''
      } flex w-fit flex-col items-center gap-2 p-2`}
      onClick={() => selectBlock(editor, element.location)}
    >
      <picture
        className={`max-h-[300px] max-w-[400px] bg-contain bg-no-repeat`}
        style={{
          backgroundImage: `url(data:${format};base64,${img})`,
          width: imgWidth,
          height: imgHeight
        }}
      />
      <Input
        type="text"
        placeholder="Add caption (optional)"
        maxLength={27}
        className="mt-2 w-[240px]"
      />
    </figure>
  );
}
