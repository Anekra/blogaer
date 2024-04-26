import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';
import { BaseSelection } from 'slate';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from './ui/dropdown-menu';
import {
  getElement,
  getElementHeadingSize,
  getElementType,
  getHeadingSizeKey,
  toggleStyle,
  toggleType
} from '../utils/helper';
import { useSlate } from 'slate-react';
import { HeadingSize, WysiwygStyle, WysiwygType } from '../enums';

export default function Wysiwyg({
  prevSelection,
  linkEditorOpened,
  handleShowLinkEditor
}: {
  prevSelection: BaseSelection;
  linkEditorOpened: boolean;
  handleShowLinkEditor: (visible: boolean) => void;
}) {
  const editor = useSlate();
  const elementType = getElementType(editor);
  const elementHeadingSize = getElementHeadingSize(editor);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selections = prevSelection;
  const link = linkEditorOpened;
  const show = handleShowLinkEditor;

  return (
    <div className="flex flex-col gap-3">
      <div>
        <button
          className="flex w-full items-center justify-center gap-2 rounded border-2 font-bold hover:border-foreground hover:bg-foreground/50 active:bg-background"
          onClick={() => console.log(getElement(editor))}
        >
          <span className="text-2xl">+</span>
          Paragraph
        </button>
      </div>
      <hr />
      <div className="grid grid-cols-3 items-center justify-center gap-1 [&>*:first-child]:font-serif [&>*:not(:nth-child(2))]:flex [&>*:not(:nth-child(2))]:items-center [&>*:not(:nth-child(2))]:justify-center hover:[&>*:not(:nth-child(2))]:bg-foreground/50 [&>*:nth-child(2)]:font-serif [&>*]:h-10 [&>*]:w-10 [&>*]:rounded [&>*]:text-3xl">
        <DropdownMenu onOpenChange={(open) => setDropdownOpen(open)}>
          <DropdownMenuTrigger
            className={`${
              elementType === WysiwygType.Heading ? 'bg-foreground/25' : ''
            } flex items-center justify-center outline-none hover:bg-foreground/50`}
          >
            <strong className="text-xl">
              {elementType === WysiwygType.Heading
                ? getHeadingSizeKey(elementHeadingSize as HeadingSize)
                : 'H'}
            </strong>
            <span
              className={`${
                dropdownOpen ? 'rotate-180' : ''
              } text-[10px] transition-transform duration-300`}
            >
              &#8711;
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="rounded bg-black"
            align="start"
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <DropdownMenuRadioGroup
              value={elementHeadingSize}
              onValueChange={(value) => {
                toggleType(editor, WysiwygType.Heading, value);
              }}
            >
              <DropdownMenuRadioItem value={HeadingSize.H1}>
                H1 (Extra Large)
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value={HeadingSize.H2}>
                H2 (Large)
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value={HeadingSize.H3}>
                H3 (Medium)
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <button
          className={`${
            elementType === WysiwygType.Paragraph ? 'bg-foreground/25' : ''
          }`}
          onClick={() => toggleType(editor, WysiwygType.Paragraph)}
        >
          P
        </button>
        <button onClick={() => toggleType(editor, WysiwygType.Code)}>
          <span className="text-xl font-semibold">&lt;/&gt;</span>
        </button>
        <button onClick={() => toggleType(editor, WysiwygType.Quote)}>
          <Icon icon="foundation:comment-quotes" />
        </button>
        <button onClick={() => toggleType(editor, WysiwygType.ListBullets)}>
          <Icon icon="ion:list" />
        </button>
        <button onClick={() => toggleType(editor, WysiwygType.ListNumbers)}>
          <Icon icon="f7:list-number" />
        </button>
        <button>
          <Icon icon="bx:image-add" />
        </button>
        <button onClick={() => toggleType(editor, WysiwygType.Divider)}>
          ⎯
        </button>
      </div>
      <hr />
      <div className="grid grid-cols-3 items-center justify-center gap-1 [&>*]:flex [&>*]:h-10 [&>*]:w-10 [&>*]:items-center [&>*]:justify-center [&>*]:rounded [&>*]:font-serif [&>*]:text-3xl hover:[&>*]:bg-foreground/50">
        <button onClick={() => toggleStyle(editor, WysiwygStyle.Bold)}>
          <strong>B</strong>
        </button>
        <button onClick={() => toggleStyle(editor, WysiwygStyle.Italic)}>
          <em>I</em>
        </button>
        <button onClick={() => toggleStyle(editor, WysiwygStyle.Underline)}>
          <u>U</u>
        </button>
        <button onClick={() => toggleStyle(editor, WysiwygStyle.Strike)}>
          <s>S</s>
        </button>
        <button>
          <Icon icon="mingcute:align-left-fill" />
        </button>
        <button>
          <Icon icon="mingcute:align-center-fill" />
        </button>
        <button>
          <Icon icon="mingcute:align-right-fill" />
        </button>
        <button>
          <Icon icon="mingcute:align-justify-fill" />
        </button>
        <button>
          <Icon icon="ph:link-bold" />
        </button>
      </div>
    </div>
  );
}
