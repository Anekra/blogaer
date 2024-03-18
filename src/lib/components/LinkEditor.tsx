import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import { NodeEntry, Editor, Node, Range } from 'slate';
import { WysiwygStyle } from '../enums';
import { CustomElement } from '../slate';
import { useSlate } from 'slate-react';
import isUrl from 'is-url';
import { wrapLink } from '../utils/editor';

export default function LinkEditor({
  visible,
  handleShowLinkEditor
}: {
  visible: boolean;
  handleShowLinkEditor: (visible: boolean) => void;
}) {
  const linkDivRef = useRef<HTMLDivElement | null>(null);
  const linkInputRef = useRef<HTMLInputElement | null>(null);
  const editor = useSlate();
  const [linkNode]: NodeEntry<CustomElement> | [] =
    Editor.above(editor, {
      at: editor.selection || [],
      match: (n: Node) => (n as CustomElement).type === WysiwygStyle.Link
    }) || [];
  const [link, setLink] = useState(linkNode?.url || '');
  const [showLinkTooltip, setShowLinkTooltip] = useState(false);
  const onInputLinkChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setLink((e.target as HTMLInputElement)?.value),
    [setLink]
  );
  const onApply = () => {
    const { selection } = editor;
    if (selection === null) return;
    wrapLink(editor, selection, link, Editor.string(editor, selection));
    handleShowLinkEditor(false);
  };

  useEffect(() => {
    const linkDivEl = linkDivRef.current;
    const linkInputEl = linkInputRef.current;
    const { selection } = editor;

    if (!linkDivEl) return;

    if (
      !selection ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      linkDivEl.removeAttribute('style');
      return;
    }

    const domSelection = window.getSelection();
    const domRange = domSelection?.getRangeAt(0);
    const rect = domRange?.getBoundingClientRect();

    if (rect) {
      linkDivEl.style.zIndex = '10';
      linkDivEl.style.opacity = '1';
      linkDivEl.style.top = `${
        rect.top + window.scrollY - linkDivEl.offsetHeight - 5
      }px`;
      linkDivEl.style.left = `${
        rect.left + window.scrollX - linkDivEl.offsetWidth / 2 + rect?.width / 2
      }px`;
      linkInputEl?.focus();
    }
  }, [editor, visible]);

  return (
    <div
      ref={linkDivRef}
      className={`absolute mb-5 rounded bg-background text-sm opacity-0 brightness-200 after:absolute after:left-[47%] after:top-full after:border-8 after:border-solid after:border-[hsl(0_0%_90%)_transparent_transparent_transparent] dark:after:border-[hsl(14_0%_9%)_transparent_transparent_transparent]`}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setLink('');
          handleShowLinkEditor(false);
        }
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (isUrl(link)) onApply();
        }}
        className="flex items-center gap-3 rounded p-1"
      >
        <input
          ref={linkInputRef}
          name="url"
          type="text"
          value={link}
          className="rounded bg-background p-1 outline-none placeholder:text-foreground/20"
          placeholder="Enter link url"
          onChange={onInputLinkChanged}
        />
        <div className="flex items-center gap-1">
          {link !== '' && (
            <button
              type="reset"
              className="flex h-4 w-4 items-center justify-center rounded border-y-2 border-r-2 border-foreground brightness-50 before:absolute before:mr-2 before:box-border before:h-[14px] before:w-4 before:rotate-45 before:rounded before:border-l-2 after:absolute after:mr-2 after:box-border after:h-[14px] after:w-4 after:-rotate-45 after:rounded after:border-l-2 hover:brightness-100"
              onClick={() => setLink('')}
            >
              <span className="mb-[2px]">✘</span>
            </button>
          )}
          <button
            type="submit"
            className={`${
              isUrl(link)
                ? 'text-green-500 hover:bg-green-500 hover:text-background hover:brightness-100'
                : 'text-foreground/40'
            } flex h-6 w-6 items-center justify-center rounded-3xl text-2xl`}
            onMouseEnter={() => {
              if (!isUrl(link)) {
                setShowLinkTooltip(true);
              }
            }}
            onMouseLeave={() => setShowLinkTooltip(false)}
          >
            ✔
          </button>
        </div>
        <div
          className={`${
            showLinkTooltip ? 'flex' : 'hidden'
          } absolute bottom-[110%] mr-3 rounded-t bg-black px-3 py-2 text-red-500 after:absolute after:left-0 after:top-full after:mr-3 after:border-8 after:border-solid after:border-[black_transparent_transparent_transparent]`}
        >
          <p className="whitespace-nowrap">not a valid link!</p>
        </div>
      </form>
    </div>
  );
}
