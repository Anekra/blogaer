import { SlateEditor } from '../types/common';
import { RenderElementProps, RenderLeafProps } from 'slate-react';
import { WysiwygStyle, WysiwygType } from '../utils/enums';
import PostCodeEditor from '../components/post/PostCodeEditor';
import React from 'react';
import PostDivider from '../components/post/PostDivider';
import PostImage from '../components/post/PostImage';
import PostQuote from '../components/post/PostQuote';
import PostLink from '../components/post/PostLink';

export default function useEditorConfig(editor: SlateEditor) {
  const { isVoid } = editor;
  editor.isVoid = (element) => {
    return ['image'].includes(element.type) || isVoid(element);
  };

  editor.isInline = (element) => ['link'].includes(element.type);

  return { renderElement, renderLeaf };
}

function renderElement(props: RenderElementProps) {
  const { children, element, attributes } = props;
  const text = element.children[0].text;

  switch (element.type) {
    case WysiwygType.Heading:
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
    case WysiwygType.Code:
      return (
        <code {...attributes} contentEditable={false}>
          <PostCodeEditor element={element} />
          <span className="hidden">{children}</span>
        </code>
      );
    case WysiwygType.Quote:
      return <PostQuote props={props} text={text} />;
    case WysiwygType.List:
      return (
        <li {...attributes} className={`${!text ? 'ph relative' : ''}`}>
          {children}
        </li>
      );
    case WysiwygType.ListBullets:
      return (
        <ul {...attributes} className="list-disc px-[18px]">
          {children}
        </ul>
      );
    case WysiwygType.ListNumbers:
      return (
        <ol {...attributes} className="list-decimal px-[18px]">
          {children}
        </ol>
      );
    case WysiwygType.Image:
      return <PostImage element={element}>{children}</PostImage>;
    case WysiwygType.Divider:
      return <PostDivider>{children}</PostDivider>;
    case WysiwygStyle.Link:
      return <PostLink props={props} />;
    default:
      return (
        <p
          {...attributes}
          className={`${!text ? 'ph relative' : ''} ${element.align}`}
        >
          {children}
        </p>
      );
  }
}

function renderLeaf({ children, leaf, attributes }: RenderLeafProps) {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.strikethrough) {
    children = <s>{children}</s>;
  }

  return <span {...attributes}>{children}</span>;
}
