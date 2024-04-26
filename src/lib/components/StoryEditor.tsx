import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Descendant, Editor, Range, createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';
import LinkEditor from './LinkEditor';
import useEditorConfig from '../hooks/useEditorConfig';
import useSelection from '../hooks/useSelection';
import Wysiwyg from './Wysiwyg';
import { HotKeys, WysiwygType } from '../enums';
import isHotkey from 'is-hotkey';
import {
  collapseSelection,
  getElementType,
  removeElement,
  toggleStyle
} from '../utils/helper';
import { CUSTOM_PLACEHOLDER } from '../constants';

export default function StoryEditor({
  document,
  onChange
}: {
  document: Descendant[];
  onChange: React.Dispatch<React.SetStateAction<Descendant[]>>;
}) {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const { renderElement, renderLeaf } = useEditorConfig(editor);
  const [prevSelection, selection, setSelection] = useSelection(editor);
  const [showLinkEditor, setShowLinkEditor] = useState(false);
  const [editorFocusOnce, setEditorFocusOnce] = useState(false);
  const handleShowLinkEditor = (visible: boolean) => {
    setShowLinkEditor(visible);
    if (!visible) collapseSelection(editor);
  };
  const onChangeHandler = useCallback(
    (value: Descendant[]) => {
      onChange(value);
      setSelection(editor.selection);
      const isASTChange = editor.operations.some(
        (op) => op.type !== 'set_selection'
      );
      if (isASTChange) {
        const content = JSON.stringify(value);
        localStorage.setItem('content', content);
      }
    },
    [editor.selection, onChange, setSelection, editor.operations]
  );

  useEffect(() => {
    const { selection } = editor;
    if (
      !selection ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      setShowLinkEditor(false);
    }
    if (!editorFocusOnce) {
      ReactEditor.focus(editor);
      setEditorFocusOnce(true);
    }
  }, [editor, selection, setSelection, editorFocusOnce]);

  return (
    <Slate editor={editor} initialValue={document} onChange={onChangeHandler}>
      <div className="flex flex-col gap-2" id="wysiwyg-toolbar">
        <Wysiwyg
          prevSelection={prevSelection}
          linkEditorOpened={showLinkEditor}
          handleShowLinkEditor={handleShowLinkEditor}
        />
      </div>
      <div className="min-h-screen w-9/12 rounded px-4 pb-6" id="story-form">
        <LinkEditor
          handleShowLinkEditor={handleShowLinkEditor}
          visible={showLinkEditor}
        />
        <Editable
          className="flex flex-col gap-4 outline-none"
          placeholder={`${
            CUSTOM_PLACEHOLDER.includes(getElementType(editor) as any)
              ? ''
              : 'Type something'
          }`}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onFocus={() => setSelection(prevSelection)}
          onKeyDown={(e) => {
            Object.keys(HotKeys).forEach((key) => {
              if (isHotkey(key, e)) {
                e.preventDefault();
                const style = HotKeys[key as keyof typeof HotKeys];
                toggleStyle(editor, style);
              }
            });
            if (
              getElementType(editor) === WysiwygType.Divider &&
              (e.key.match('Backspace') || e.key.match('Delete')) &&
              editor.children.length > 1
            ) {
              removeElement(editor);
            }
            if (
              getElementType(editor) ===
                (WysiwygType.ListBullets || WysiwygType.ListNumbers) &&
              e.key.match('Enter')
            ) {
              console.log('test');
              e.preventDefault();
            }
          }}
        />
      </div>
    </Slate>
  );
}
