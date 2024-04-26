import Link from 'next/link';
import { SlateEditor } from '../types';
import { RenderElementProps, RenderLeafProps } from 'slate-react';
import Image from 'next/image';
import { WysiwygStyle, WysiwygType } from '../enums';
import CodeEditor from '../components/CodeEditor';
import React from 'react';

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
        <h1 {...attributes} className={`${element.headingSize} font-bold`}>
          {children}
        </h1>
      );
    case WysiwygType.Code:
      return (
        <code {...attributes} contentEditable={false}>
          <CodeEditor element={element} />
          <span className="hidden">{children}</span>
        </code>
      );
    case WysiwygType.Quote:
      return (
        <blockquote
          {...attributes}
          className="flex rounded-md bg-foreground/10 p-3 font-serif"
        >
          <span
            className="h-[50px] rotate-180 select-none self-start text-8xl font-bold leading-[0]"
            contentEditable={false}
          >
            &bdquo;
          </span>
          <span
            className={`${
              !text ? 'ph relative flex' : ''
            } w-full px-4 text-xl outline-none`}
          >
            {children}
          </span>
          <span
            className="h-[50px] select-none self-end text-8xl font-bold leading-[0]"
            contentEditable={false}
          >
            &bdquo;
          </span>
        </blockquote>
      );
    case WysiwygType.List:
      return <li {...attributes}>{children}</li>;
    case WysiwygType.ListBullets:
      return (
        <ul {...attributes} className="list-disc">
          {children}
        </ul>
      );
    case WysiwygType.ListNumbers:
      return (
        <ol {...attributes} className="list-decimal">
          {children}
        </ol>
      );
    case WysiwygType.Divider:
      return (
        <div {...attributes} className="py-8" contentEditable={false}>
          <hr className="" />
          <span className="hidden">{children}</span>
        </div>
      );
    case WysiwygStyle.Link:
      return (
        <Link {...props} href={element.url || ''}>
          {children}
        </Link>
      );
    case WysiwygType.Image:
      return <Image {...props} src="" alt="Blog" />;
    default:
      return <p {...attributes}>{children}</p>;
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

  return <span {...attributes}>{children}</span>;
}
