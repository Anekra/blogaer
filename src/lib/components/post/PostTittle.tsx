import React from 'react';
import { RenderElementProps } from 'slate-react';
export default function PostTittle({
  props,
  text,
  tags,
  viewOnly
}: {
  props: RenderElementProps;
  text: string;
  tags?: string[];
  viewOnly?: boolean;
}) {
  const { children, element, attributes } = props;
  return (
    <React.Fragment>
      <h1
        {...attributes}
        className={`mb-4 text-5xl font-bold ${element.headingSize} ${
          element.align
        }${!text && !viewOnly ? ' ph relative' : ''}`}
      >
        {children}
      </h1>
      {viewOnly && (
        <div className="mb-6 flex h-[26px] justify-end gap-2">
          {tags?.map((tag, i) => (
            <div key={i} className="tags">
              <p>{tag}</p>
            </div>
          ))}
        </div>
      )}
    </React.Fragment>
  );
}
