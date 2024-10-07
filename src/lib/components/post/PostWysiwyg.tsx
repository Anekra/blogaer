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
  addCodeEditor,
  addDivider,
  addImageHolder,
  addParagraph,
  getElementAlignment,
  getElementHeadingSize,
  getElementType,
  getHeadingSizeKey,
  isFirstElement as isFirstElementSelected,
  isLinkSelected,
  isStyleActive,
  toggleAlign,
  toggleLink,
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
import { VOIDS } from '../../utils/constants';
import TitleTooltip from '../popovers/TitleTooltip';
import { ChevronDown } from 'lucide-react';
import AddImgIcon from '../icons/AddImgIcon';

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
  const isFocused = useFocused();
  const isNoneSelected = !editor.selection;
  const isFirstEl = isFirstElementSelected(editor);
  const isVoidEl = elementType ? VOIDS.includes(elementType) : false;
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const handleTooltipVisibility = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const isHover = e.type === 'mouseenter' && isFirstEl;
    setIsTooltipVisible(isHover === true);
  };

  return (
    <div ref={wysiwygRef} className="sticky top-24 flex flex-col gap-3">
      <div>
        <button
          className="flex w-full items-center justify-center gap-2 rounded border border-accent px-2 font-bold hover:border-foreground active:bg-foreground/50"
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
      <div className="grid grid-cols-3 items-center justify-center gap-1 [&>*]:relative [&>*]:h-10 [&>*]:w-10 [&>*]:text-3xl">
        <div
          onMouseEnter={handleTooltipVisibility}
          onMouseLeave={handleTooltipVisibility}
        >
          <button
            className={`group relative flex h-full w-full items-center justify-center rounded outline-none enabled:hover:bg-accent-foreground disabled:text-foreground/50${
              elementType === WysiwygType.Code ? ' bg-foreground/25' : ''
            }`}
            onMouseDown={(e) => {
              e.preventDefault();
              addCodeEditor(editor);
            }}
            disabled={isNoneSelected || isFirstEl}
          >
            <span className="text-xl font-semibold">&lt;/&gt;</span>
            <span className="absolute right-[1px] top-[22px] rounded-3xl bg-background px-[1px] py-[2px] pb-[3px] text-xl font-semibold leading-[0.5] group-hover:bg-accent-foreground">
              +
            </span>
          </button>
        </div>
        <div
          onMouseEnter={handleTooltipVisibility}
          onMouseLeave={handleTooltipVisibility}
        >
          <button
            className={`flex h-full w-full items-center justify-center rounded outline-none enabled:hover:bg-accent-foreground disabled:text-foreground/50${
              elementType === WysiwygType.Image ? ' bg-foreground/25' : ''
            }`}
            onMouseDown={(e) => {
              e.preventDefault();
              addImageHolder(editor);
            }}
            disabled={isNoneSelected || isFirstEl}
          >
            <AddImgIcon />
          </button>
        </div>
        <div
          onMouseEnter={handleTooltipVisibility}
          onMouseLeave={handleTooltipVisibility}
        >
          <button
            className={`group flex h-full w-full items-center justify-center rounded outline-none enabled:hover:bg-accent-foreground disabled:text-foreground/50${
              elementType === WysiwygType.Divider ? ' bg-foreground/25' : ''
            }`}
            onMouseDown={(e) => {
              e.preventDefault();
              addDivider(editor);
            }}
            disabled={isNoneSelected || isFirstEl}
          >
            <span className="font-bold">⎯</span>
            <span className="absolute right-[1px] top-[22px] rounded-3xl bg-background px-[1px] py-[2px] pb-[3px] text-xl font-semibold leading-[0.5] group-hover:bg-accent-foreground">
              +
            </span>
          </button>
        </div>
      </div>
      <hr />
      <div className="grid grid-cols-3 items-center justify-center gap-1 [&>*:first-child]:font-serif [&>*:nth-child(2)]:font-serif [&>*]:relative [&>*]:h-10 [&>*]:w-10 [&>*]:text-3xl">
        <DropdownMenu onOpenChange={(open) => setDropdownOpen(open)}>
          <div
            onMouseEnter={handleTooltipVisibility}
            onMouseLeave={handleTooltipVisibility}
          >
            <DropdownMenuTrigger
              className={`${
                elementType === WysiwygType.Heading ? 'bg-foreground/25' : ''
              } flex h-full w-full items-center justify-center rounded outline-none enabled:hover:bg-accent-foreground disabled:text-foreground/50`}
              disabled={isNoneSelected || isFirstEl}
            >
              <strong className="text-xl">
                {elementType === WysiwygType.Heading && !isFirstEl
                  ? getHeadingSizeKey(elementHeadingSize as HeadingSize)
                  : 'H'}
              </strong>
              {(!isNoneSelected || !isFirstEl) && (
                <span
                  className={`${
                    dropdownOpen ? 'rotate-180' : ''
                  } text-[10px] transition-transform duration-300`}
                >
                  <ChevronDown width={10} />
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
                H1 (Large)
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value={HeadingSize.H2}>
                H2 (Medium)
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value={HeadingSize.H3}>
                H3 (Small)
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
            } flex h-full w-full items-center justify-center rounded outline-none enabled:hover:bg-accent-foreground disabled:text-foreground/50`}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleType(editor, WysiwygType.Paragraph);
            }}
            disabled={isNoneSelected || isFirstEl}
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
              elementType === WysiwygType.Quote ? 'bg-foreground/25' : ''
            } flex h-full w-full items-center justify-center rounded outline-none enabled:hover:bg-accent-foreground disabled:text-foreground/50`}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleType(editor, WysiwygType.Quote);
            }}
            disabled={isNoneSelected || isFirstEl}
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
            } flex h-full w-full items-center justify-center rounded outline-none enabled:hover:bg-accent-foreground disabled:text-foreground/50`}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleType(editor, WysiwygType.ListBullets);
            }}
            disabled={isNoneSelected || isFirstEl}
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
            } flex h-full w-full items-center justify-center rounded outline-none enabled:hover:bg-accent-foreground disabled:text-foreground/50`}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleType(editor, WysiwygType.ListNumbers);
            }}
            disabled={isNoneSelected || isFirstEl}
          >
            <Icon icon="f7:list-number" />
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
            } flex h-full w-full items-center justify-center rounded outline-none enabled:hover:bg-accent-foreground disabled:text-foreground/50`}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleStyle(editor, WysiwygStyle.Bold);
            }}
            disabled={isNoneSelected || isFirstEl || isVoidEl}
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
            } flex h-full w-full items-center justify-center rounded outline-none enabled:hover:bg-accent-foreground disabled:text-foreground/50`}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleStyle(editor, WysiwygStyle.Italic);
            }}
            disabled={isNoneSelected || isFirstEl || isVoidEl}
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
            } flex h-full w-full items-center justify-center rounded outline-none enabled:hover:bg-accent-foreground disabled:text-foreground/50`}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleStyle(editor, WysiwygStyle.Underline);
            }}
            disabled={isNoneSelected || isFirstEl || isVoidEl}
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
            } flex h-full w-full items-center justify-center rounded outline-none enabled:hover:bg-accent-foreground disabled:text-foreground/50`}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleStyle(editor, WysiwygStyle.Strike);
            }}
            disabled={isNoneSelected || isFirstEl || isVoidEl}
          >
            <s>S</s>
          </button>
        </div>
        <button
          className={`${
            elementAlignment === WysiwygAlign.Left ? 'bg-foreground/25' : ''
          } flex h-full w-full items-center justify-center rounded outline-none enabled:hover:bg-accent-foreground disabled:text-foreground/50`}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleAlign(editor, WysiwygAlign.Left);
          }}
          disabled={isNoneSelected || isVoidEl}
        >
          <Icon icon="mingcute:align-left-fill" />
        </button>
        <button
          className={`${
            elementAlignment === WysiwygAlign.Center ? 'bg-foreground/25' : ''
          } flex h-full w-full items-center justify-center rounded outline-none enabled:hover:bg-accent-foreground disabled:text-foreground/50`}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleAlign(editor, WysiwygAlign.Center);
          }}
          disabled={isNoneSelected || isVoidEl}
        >
          <Icon icon="mingcute:align-center-fill" />
        </button>
        <button
          className={`${
            elementAlignment === WysiwygAlign.Right ? 'bg-foreground/25' : ''
          } flex h-full w-full items-center justify-center rounded outline-none enabled:hover:bg-accent-foreground disabled:text-foreground/50`}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleAlign(editor, WysiwygAlign.Right);
          }}
          disabled={isNoneSelected || isVoidEl}
        >
          <Icon icon="mingcute:align-right-fill" />
        </button>
        <button
          className={`${
            elementAlignment === WysiwygAlign.Justify ? 'bg-foreground/25' : ''
          } flex h-full w-full items-center justify-center rounded outline-none enabled:hover:bg-accent-foreground disabled:text-foreground/50`}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleAlign(editor, WysiwygAlign.Justify);
          }}
          disabled={isNoneSelected || isVoidEl}
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
            } flex h-full w-full items-center justify-center rounded outline-none enabled:hover:bg-accent-foreground disabled:text-foreground/50`}
            onMouseDown={(e) => {
              e.preventDefault();
              if (isLinkSelected(editor)) toggleLink(editor);
              else handleShowLinkEditor(true);
            }}
            disabled={
              isNoneSelected || isVoidEl || isLinkEditorOpen || !isFocused
            }
          >
            <Icon icon="ph:link-bold" />
          </button>
        </div>
      </div>
      <TitleTooltip
        text="Cannot change the first element styles! Except for its alignment."
        isVisible={isTooltipVisible}
        parentEl={wysiwygRef.current}
      />
    </div>
  );
}
