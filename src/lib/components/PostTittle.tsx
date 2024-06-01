import React from 'react';
import { RenderElementProps, useSlate } from 'slate-react';
import { getPath } from '../utils/helper';

export default function PostTittle({
  props,
  text
}: {
  props: RenderElementProps;
  text: string;
}) {
  const { children, element, attributes } = props;
  const editor = useSlate();
  const path = getPath(editor, element);

  return (
    <h1
      {...attributes}
      id={`${text}-${path?.join()}`}
      className={`${element.headingSize} ${!text ? 'ph relative' : ''} ${
        element.align
      } font-bold`}
    >
      {children}
    </h1>
  );
}
