import React, { useRef } from 'react';
import { CustomElement } from '../slate';
import { Input } from './ui/input';
import { selectElement, setImageCaption } from '../utils/helper';
import { useSlate } from 'slate-react';
import Image from 'next/image';

export default function BlogImage({
  element,
  children
}: {
  element: CustomElement;
  children: any;
}) {
  const frameRef = useRef<HTMLPictureElement>(null);
  const img = element.imageBase64;
  const editor = useSlate();
  if (!img) return;
  const isSelected =
    editor.selection?.anchor.path.join() === element.position.join();
  const imgHeight = element.imageHeight < 300 ? element.imageHeight : 300;

  const imgWidth =
    element.imageHeight <= 300
      ? element.imageWidth
      : (element.imageWidth / element.imageHeight) * 300;
  return (
    <figure
      ref={frameRef}
      className={`${
        isSelected ? 'rounded border border-dashed border-primary-foreground' : ''
      } flex w-full flex-col items-center justify-center gap-2 p-2`}
      onMouseDown={(e) => {
        e.preventDefault();
        selectElement(editor, element.position);
      }}
      contentEditable={false}
    >
      <Image
        src={img}
        alt={
          element.imageCaption || (element.imageName as string).split('.')[0]
        }
        width={imgWidth}
        height={imgHeight}
      />
      <Input
        type="text"
        placeholder="Add caption (optional)"
        maxLength={27}
        className="mt-2 w-[240px]"
        onChange={(e) => setImageCaption(editor, e.target.value)}
      />
      <span className="hidden">{children}</span>
    </figure>
  );
}
