import React from 'react';
import { RenderElementProps } from 'slate-react';

export default function PostTittle({
  props,
  text
}: {
  props: RenderElementProps;
  text: string;
}) {
  const { children, element, attributes } = props;
  return (
    <h1
      {...attributes}
      className={`${element.headingSize} ${!text ? 'ph relative' : ''} ${
        element.align
      } font-bold`}
    >
      {children}
    </h1>
  );
}
