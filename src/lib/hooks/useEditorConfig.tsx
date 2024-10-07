import { SlateEditor } from '../types/common';
import { RenderElementProps, RenderLeafProps } from 'slate-react';
import { WysiwygStyle, WysiwygType } from '../utils/enums';
import PostCodeEditor from '../components/post/PostCodeEditor';
import React from 'react';
import PostDivider from '../components/post/PostDivider';
import PostImage from '../components/post/PostImage';
import PostQuote from '../components/post/PostQuote';
import PostLink from '../components/post/PostLink';
import { getElement } from '../utils/helper';
import PostImagePicker from '../components/post/PostImagePicker';
import { VOIDS } from '../utils/constants';
import PostTittle from '../components/post/PostTittle';
import PostHeading from '../components/post/PostHeading';

export default function useEditorConfig(editor: SlateEditor) {
  editor.isVoid = (element) => VOIDS.includes(element.type);
  editor.isInline = (element) => element.type === WysiwygStyle.Link;

  return { renderElement, renderLeaf };
}

function renderElement(props: RenderElementProps, editor: SlateEditor) {
  const { attributes, element, children } = props;
  const text = element.children[0].text;
  const isFocus = element === getElement(editor);

  if (editor.children[0] === element) {
    return <PostTittle props={props} text={text} />;
  }

  switch (element.type) {
    case WysiwygType.Heading:
      return <PostHeading props={props} text={text} />;
    case WysiwygType.Code:
      return <PostCodeEditor {...props} />;
    case WysiwygType.Quote:
      return <PostQuote props={props} text={text} />;
    case WysiwygType.List:
      return (
        <li
          {...attributes}
          className={`${isFocus && !text ? 'ph relative' : ''}`}
        >
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
    case WysiwygType.ImagePicker:
      return <PostImagePicker {...props} />;
    case WysiwygType.Image:
      return <PostImage props={props} />;
    case WysiwygType.Divider:
      return <PostDivider {...props} />;
    case WysiwygStyle.Link:
      return <PostLink {...props} />;
    default:
      return (
        <p
          {...attributes}
          className={`md:text-lg ${element.align} ${
            isFocus && !text ? 'ph relative' : ''
          } `}
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
