import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useRef, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from './ui/dropdown-menu';
import {
  addParagraph,
  getElementAlignment,
  getElementHeadingSize,
  getElementType,
  getHeadingSizeKey,
  isStyleActive,
  toggleAlign,
  toggleStyle,
  toggleType
} from '../utils/helper';
import { useFocused, useSlate } from 'slate-react';
import { HeadingSize, WysiwygAlign, WysiwygStyle, WysiwygType } from '../enums';
import useImageUpload from '../hooks/useImageUpload';
import { NOT_ALIGNABLE, NOT_STYLABLE } from '../constants';

export default function Wysiwyg({
  isLinkEditorOpen,
  handleShowLinkEditor
}: {
  isLinkEditorOpen: boolean;
  handleShowLinkEditor: (visible: boolean) => void;
}) {
  const editor = useSlate();
  const elementType = getElementType(editor);
  const elementAlignment = getElementAlignment(editor);
  const elementHeadingSize = getElementHeadingSize(editor);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const inputImgRef = useRef<HTMLInputElement>(null);
  const isFocused = useFocused();

  return (
    <div className="flex flex-col gap-3">
      <div>
        <button
          className="flex w-full items-center justify-center gap-2 rounded border-2 font-bold hover:border-foreground hover:bg-foreground/50 active:bg-background"
          onMouseDown={(e) => {
            e.preventDefault();
            addParagraph(editor);
          }
        }
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
          onMouseDown={(e) => {
            e.preventDefault();
            toggleType(editor, WysiwygType.Paragraph);
          }}
        >
          P
        </button>
        <button
          className={`${
            elementType === WysiwygType.Code ? 'bg-foreground/25' : ''
          }`}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleType(editor, WysiwygType.Code);
          }}
        >
          <span className="text-xl font-semibold">&lt;/&gt;</span>
        </button>
        <button
          className={`${
            elementType === WysiwygType.Quote ? 'bg-foreground/25' : ''
          }`}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleType(editor, WysiwygType.Quote);
          }}
        >
          <Icon icon="foundation:comment-quotes" />
        </button>
        <button
          className={`${
            elementType === WysiwygType.ListBullets ? 'bg-foreground/25' : ''
          }`}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleType(editor, WysiwygType.ListBullets);
          }}
        >
          <Icon icon="ion:list" />
        </button>
        <button
          className={`${
            elementType === WysiwygType.ListNumbers ? 'bg-foreground/25' : ''
          }`}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleType(editor, WysiwygType.ListNumbers);
          }}
        >
          <Icon icon="f7:list-number" />
        </button>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            inputImgRef.current?.click();
          }}
        >
          <input
            ref={inputImgRef}
            type="file"
            name="image"
            accept="image/png, image/gif, image/jpeg"
            className="hidden"
            onChange={useImageUpload(editor)}
          />
          <Icon icon="bx:image-add" />
        </button>
        <button
          className={`${
            elementType === WysiwygType.Divider ? 'bg-foreground/25' : ''
          }`}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleType(editor, WysiwygType.Divider);
          }}
        >
          ⎯
        </button>
      </div>
      <hr />
      <div className="grid grid-cols-3 items-center justify-center gap-1 [&>*]:flex [&>*]:h-10 [&>*]:w-10 [&>*]:items-center [&>*]:justify-center [&>*]:rounded [&>*]:font-serif [&>*]:text-3xl enabled:hover:[&>*]:bg-foreground/50">
        <button
          className={`${
            isStyleActive(editor, WysiwygStyle.Bold) ? 'bg-foreground/25' : ''
          } hover:bg-transparent disabled:text-foreground/50`}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleStyle(editor, WysiwygStyle.Bold);
          }}
          disabled={elementType ? NOT_STYLABLE.includes(elementType) : false}
        >
          <strong>B</strong>
        </button>
        <button
          className={`${
            isStyleActive(editor, WysiwygStyle.Italic) ? 'bg-foreground/25' : ''
          } hover:bg-transparent disabled:text-foreground/50`}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleStyle(editor, WysiwygStyle.Italic);
          }}
          disabled={elementType ? NOT_STYLABLE.includes(elementType) : false}
        >
          <em>I</em>
        </button>
        <button
          className={`${
            isStyleActive(editor, WysiwygStyle.Underline)
              ? 'bg-foreground/25'
              : ''
          } hover:bg-transparent disabled:text-foreground/50`}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleStyle(editor, WysiwygStyle.Underline);
          }}
          disabled={elementType ? NOT_STYLABLE.includes(elementType) : false}
        >
          <u>U</u>
        </button>
        <button
          className={`${
            isStyleActive(editor, WysiwygStyle.Strike) ? 'bg-foreground/25' : ''
          } disabled:text-foreground/50`}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleStyle(editor, WysiwygStyle.Strike);
          }}
          disabled={elementType ? NOT_STYLABLE.includes(elementType) : false}
        >
          <s>S</s>
        </button>
        <button
          className={`${
            elementAlignment === WysiwygAlign.Left ? 'bg-foreground/25' : ''
          } disabled:text-foreground/50`}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleAlign(editor, WysiwygAlign.Left);
          }}
          disabled={elementType ? NOT_ALIGNABLE.includes(elementType) : false}
        >
          <Icon icon="mingcute:align-left-fill" />
        </button>
        <button
          className={`${
            elementAlignment === WysiwygAlign.Center ? 'bg-foreground/25' : ''
          } disabled:text-foreground/50`}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleAlign(editor, WysiwygAlign.Center);
          }}
          disabled={elementType ? NOT_ALIGNABLE.includes(elementType) : false}
        >
          <Icon icon="mingcute:align-center-fill" />
        </button>
        <button
          className={`${
            elementAlignment === WysiwygAlign.Right ? 'bg-foreground/25' : ''
          } disabled:text-foreground/50`}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleAlign(editor, WysiwygAlign.Right);
          }}
          disabled={elementType ? NOT_ALIGNABLE.includes(elementType) : false}
        >
          <Icon icon="mingcute:align-right-fill" />
        </button>
        <button
          className={`${
            elementAlignment === WysiwygAlign.Justify ? 'bg-foreground/25' : ''
          } disabled:text-foreground/50`}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleAlign(editor, WysiwygAlign.Justify);
          }}
          disabled={elementType ? NOT_ALIGNABLE.includes(elementType) : false}
        >
          <Icon icon="mingcute:align-justify-fill" />
        </button>
        <button
          className={`${
            elementType === WysiwygStyle.Link ? 'bg-foreground/25' : ''
          } disabled:text-foreground/50`}
          onMouseDown={(e) => {
            e.preventDefault();
            handleShowLinkEditor(true);
          }}
          disabled={
            elementType
              ? NOT_STYLABLE.includes(elementType) ||
                isLinkEditorOpen ||
                !isFocused
              : false
          }
        >
          <Icon icon="ph:link-bold" />
        </button>
      </div>
    </div>
  );
}
