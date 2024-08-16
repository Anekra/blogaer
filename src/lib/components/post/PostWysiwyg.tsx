import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useRef, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from '../ui/dropdown-menu';
import {
  addParagraph,
  getElementAlignment,
  getElementHeadingSize,
  getElementType,
  getHeadingSizeKey,
  isFirstElement as isFirstElementSelected,
  isStyleActive,
  toggleAlign,
  toggleStyle,
  toggleType
} from '../../utils/helper';
import { useFocused, useSlate } from 'slate-react';
import {
  HeadingSize,
  WysiwygAlign,
  WysiwygStyle,
  WysiwygType
} from '../../utils/enums';
import useImageUpload from '../../hooks/useImageUpload';
import { UNALIGNABLE, UNSTYLABLE } from '../../utils/constants';
import Tooltip from '../popovers/Tooltip';

export default function PostWysiwyg({
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
  const wysiwygRef = useRef<HTMLDivElement>(null);
  const inputImgRef = useRef<HTMLInputElement>(null);
  const isFocused = useFocused();
  const isFirstEl = isFirstElementSelected(editor);
  const isNoSelection = isFirstEl || !editor.selection;
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const handleTooltipVisibility = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const isHover = e.type === 'mouseenter' && isFirstEl;
    setIsTooltipVisible(isHover === true);
  };

  return (
    <div ref={wysiwygRef} className="flex flex-col gap-3">
      <div>
        <button
          className="flex w-full items-center justify-center gap-2 rounded border-2 font-bold hover:border-foreground hover:bg-foreground/50 active:bg-background"
          onMouseDown={(e) => {
            e.preventDefault();
            addParagraph(editor);
          }}
        >
          <span className="text-2xl">+</span>
          Paragraph
        </button>
      </div>
      <hr />
      <div className="grid grid-cols-3 items-center justify-center gap-1 [&>*:first-child]:font-serif  [&>*:nth-child(2)]:font-serif [&>*]:relative [&>*]:h-10 [&>*]:w-10 [&>*]:text-3xl">
        <DropdownMenu onOpenChange={(open) => setDropdownOpen(open)}>
          <div
            onMouseEnter={handleTooltipVisibility}
            onMouseLeave={handleTooltipVisibility}
          >
            <DropdownMenuTrigger
              className={`${
                elementType === WysiwygType.Heading ? 'bg-foreground/25' : ''
              } flex h-full w-full items-center justify-center rounded outline-none enabled:hover:bg-foreground/50 disabled:text-foreground/50`}
              disabled={isNoSelection || isFirstEl}
            >
              <strong className="text-xl">
                {elementType === WysiwygType.Heading
                  ? getHeadingSizeKey(elementHeadingSize as HeadingSize)
                  : 'H'}
              </strong>
              {(!isNoSelection || !isFirstEl) && (
                <span
                  className={`${
                    dropdownOpen ? 'rotate-180' : ''
                  } text-[10px] transition-transform duration-300`}
                >
                  &#8711;
                </span>
              )}
            </DropdownMenuTrigger>
          </div>
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
        <div
          onMouseEnter={handleTooltipVisibility}
          onMouseLeave={handleTooltipVisibility}
        >
          <button
            className={`${
              elementType === WysiwygType.Paragraph ? 'bg-foreground/25' : ''
            } ${
              isTooltipVisible ? 'relative' : ''
            } flex h-full w-full items-center justify-center rounded outline-none enabled:hover:bg-foreground/50 disabled:text-foreground/50`}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleType(editor, WysiwygType.Paragraph);
            }}
            disabled={isNoSelection || isFirstEl}
          >
            P
          </button>
        </div>
        <div
          onMouseEnter={handleTooltipVisibility}
          onMouseLeave={handleTooltipVisibility}
        >
          <button
            className={`${
              elementType === WysiwygType.Code ? 'bg-foreground/25' : ''
            } flex h-full w-full items-center justify-center rounded outline-none enabled:hover:bg-foreground/50 disabled:text-foreground/50`}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleType(editor, WysiwygType.Code);
            }}
            disabled={isNoSelection || isFirstEl}
          >
            <span className="text-xl font-semibold">&lt;/&gt;</span>
          </button>
        </div>
        <div
          onMouseEnter={handleTooltipVisibility}
          onMouseLeave={handleTooltipVisibility}
        >
          <button
            className={`${
              elementType === WysiwygType.Quote ? 'bg-foreground/25' : ''
            } flex h-full w-full items-center justify-center rounded outline-none enabled:hover:bg-foreground/50 disabled:text-foreground/50`}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleType(editor, WysiwygType.Quote);
            }}
            disabled={isNoSelection || isFirstEl}
          >
            <Icon icon="foundation:comment-quotes" />
          </button>
        </div>
        <div
          onMouseEnter={handleTooltipVisibility}
          onMouseLeave={handleTooltipVisibility}
        >
          <button
            className={`${
              elementType === WysiwygType.ListBullets ? 'bg-foreground/25' : ''
            } flex h-full w-full items-center justify-center rounded outline-none enabled:hover:bg-foreground/50 disabled:text-foreground/50`}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleType(editor, WysiwygType.ListBullets);
            }}
            disabled={isNoSelection || isFirstEl}
          >
            <Icon icon="ion:list" />
          </button>
        </div>
        <div
          onMouseEnter={handleTooltipVisibility}
          onMouseLeave={handleTooltipVisibility}
        >
          <button
            className={`${
              elementType === WysiwygType.ListNumbers ? 'bg-foreground/25' : ''
            } flex h-full w-full items-center justify-center rounded outline-none enabled:hover:bg-foreground/50 disabled:text-foreground/50`}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleType(editor, WysiwygType.ListNumbers);
            }}
            disabled={isNoSelection || isFirstEl}
          >
            <Icon icon="f7:list-number" />
          </button>
        </div>
        <div
          onMouseEnter={handleTooltipVisibility}
          onMouseLeave={handleTooltipVisibility}
        >
          <button
            className={`${
              elementType === WysiwygType.Image ? 'bg-foreground/25' : ''
            } flex h-full w-full items-center justify-center rounded outline-none enabled:hover:bg-foreground/50 disabled:text-foreground/50`}
            onMouseDown={(e) => {
              e.preventDefault();
              inputImgRef.current?.click();
            }}
            disabled={isNoSelection || isFirstEl}
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
        </div>
        <div
          onMouseEnter={handleTooltipVisibility}
          onMouseLeave={handleTooltipVisibility}
        >
          <button
            className={`${
              elementType === WysiwygType.Divider ? 'bg-foreground/25' : ''
            } flex h-full w-full items-center justify-center rounded outline-none enabled:hover:bg-foreground/50 disabled:text-foreground/50`}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleType(editor, WysiwygType.Divider);
            }}
            disabled={isNoSelection || isFirstEl}
          >
            ⎯
          </button>
        </div>
      </div>
      <hr />
      <div className="grid grid-cols-3 items-center justify-center gap-1 [&>*]:relative [&>*]:h-10 [&>*]:w-10 [&>*]:font-serif [&>*]:text-3xl">
        <div
          onMouseEnter={handleTooltipVisibility}
          onMouseLeave={handleTooltipVisibility}
        >
          <button
            className={`${
              isStyleActive(editor, WysiwygStyle.Bold) ? 'bg-foreground/25' : ''
            } flex h-full w-full items-center justify-center rounded outline-none enabled:hover:bg-foreground/50 disabled:text-foreground/50`}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleStyle(editor, WysiwygStyle.Bold);
            }}
            disabled={elementType ? UNSTYLABLE.includes(elementType) : false || isNoSelection}
          >
            <strong>B</strong>
          </button>
        </div>
        <div
          onMouseEnter={handleTooltipVisibility}
          onMouseLeave={handleTooltipVisibility}
        >
          <button
            className={`${
              isStyleActive(editor, WysiwygStyle.Italic)
                ? 'bg-foreground/25'
                : ''
            } flex h-full w-full items-center justify-center rounded outline-none enabled:hover:bg-foreground/50 disabled:text-foreground/50`}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleStyle(editor, WysiwygStyle.Italic);
            }}
            disabled={elementType ? UNSTYLABLE.includes(elementType) : false || isNoSelection}
          >
            <em>I</em>
          </button>
        </div>
        <div
          onMouseEnter={handleTooltipVisibility}
          onMouseLeave={handleTooltipVisibility}
        >
          <button
            className={`${
              isStyleActive(editor, WysiwygStyle.Underline)
                ? 'bg-foreground/25'
                : ''
            } flex h-full w-full items-center justify-center rounded outline-none enabled:hover:bg-foreground/50 disabled:text-foreground/50`}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleStyle(editor, WysiwygStyle.Underline);
            }}
            disabled={elementType ? UNSTYLABLE.includes(elementType) : false || isNoSelection}
          >
            <u>U</u>
          </button>
        </div>
        <div
          onMouseEnter={handleTooltipVisibility}
          onMouseLeave={handleTooltipVisibility}
        >
          <button
            className={`${
              isStyleActive(editor, WysiwygStyle.Strike)
                ? 'bg-foreground/25'
                : ''
            } flex h-full w-full items-center justify-center rounded outline-none enabled:hover:bg-foreground/50 disabled:text-foreground/50`}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleStyle(editor, WysiwygStyle.Strike);
            }}
            disabled={elementType ? UNSTYLABLE.includes(elementType) : false || isNoSelection}
          >
            <s>S</s>
          </button>
        </div>
        <button
          className={`${
            elementAlignment === WysiwygAlign.Left ? 'bg-foreground/25' : ''
          } flex h-full w-full items-center justify-center rounded outline-none enabled:hover:bg-foreground/50 disabled:text-foreground/50`}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleAlign(editor, WysiwygAlign.Left);
          }}
          disabled={elementType ? UNALIGNABLE.includes(elementType) : false || isNoSelection}
        >
          <Icon icon="mingcute:align-left-fill" />
        </button>
        <button
          className={`${
            elementAlignment === WysiwygAlign.Center ? 'bg-foreground/25' : ''
          } flex h-full w-full items-center justify-center rounded outline-none enabled:hover:bg-foreground/50 disabled:text-foreground/50`}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleAlign(editor, WysiwygAlign.Center);
          }}
          disabled={elementType ? UNALIGNABLE.includes(elementType) : false || isNoSelection}
        >
          <Icon icon="mingcute:align-center-fill" />
        </button>
        <button
          className={`${
            elementAlignment === WysiwygAlign.Right ? 'bg-foreground/25' : ''
          } flex h-full w-full items-center justify-center rounded outline-none enabled:hover:bg-foreground/50 disabled:text-foreground/50`}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleAlign(editor, WysiwygAlign.Right);
          }}
          disabled={elementType ? UNALIGNABLE.includes(elementType) : false || isNoSelection}
        >
          <Icon icon="mingcute:align-right-fill" />
        </button>
        <button
          className={`${
            elementAlignment === WysiwygAlign.Justify ? 'bg-foreground/25' : ''
          } flex h-full w-full items-center justify-center rounded outline-none enabled:hover:bg-foreground/50 disabled:text-foreground/50`}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleAlign(editor, WysiwygAlign.Justify);
          }}
          disabled={elementType ? UNALIGNABLE.includes(elementType) : false || isNoSelection}
        >
          <Icon icon="mingcute:align-justify-fill" />
        </button>
        <div
          onMouseEnter={handleTooltipVisibility}
          onMouseLeave={handleTooltipVisibility}
        >
          <button
            className={`${
              elementType === WysiwygStyle.Link ? 'bg-foreground/25' : ''
            } flex h-full w-full items-center justify-center rounded outline-none enabled:hover:bg-foreground/50 disabled:text-foreground/50`}
            onMouseDown={(e) => {
              e.preventDefault();
              handleShowLinkEditor(true);
            }}
            disabled={
              elementType
                ? UNSTYLABLE.includes(elementType) ||
                  isLinkEditorOpen ||
                  !isFocused
                : false || isNoSelection
            }
          >
            <Icon icon="ph:link-bold" />
          </button>
        </div>
      </div>
      <Tooltip
        text="Cannot change the first element styles! Except for its alignment."
        isVisible={isTooltipVisible}
        parentEl={wysiwygRef.current}
      />
    </div>
  );
}
