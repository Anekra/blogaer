'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Descendant, createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';
import LinkEditor from './LinkEditor';
import useEditorConfig from '../hooks/useEditorConfig';
import useSelection from '../hooks/useSelection';
import Wysiwyg from './Wysiwyg';
import { HotKeys, WysiwygType } from '../enums';
import isHotkey from 'is-hotkey';
import {
  collapseSelection,
  getElementType,
  isLinkSelected,
  removeElement,
  toggleLink,
  toggleStyle
} from '../utils/helper';
import { useContent } from '../contexts/ContentContext';

export default function CreatePostEditor() {
  const [isMounted, setIsMounted] = useState(false);
  const [content, setContent] = useContent();
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const { renderElement, renderLeaf } = useEditorConfig(editor);
  const [selection, setSelection] = useSelection(editor);
  const [showLinkEditor, setShowLinkEditor] = useState(false);
  const handleShowLinkEditor = (visible: boolean) => {
    if (isLinkSelected(editor)) {
      toggleLink(editor);
    } else {
      setShowLinkEditor(visible);
    }
    if (!visible) collapseSelection(editor);
  };
  const onChangeHandler = useCallback(
    (value: Descendant[]) => {
      setContent(value);
      setSelection(editor.selection);
      const isASTChange = editor.operations.some(
        (op) => op.type !== 'set_selection'
      );
      if (isASTChange) {
        const content = JSON.stringify(value);
        localStorage.setItem('content', content);
      }
    },
    [editor.selection, setContent, setSelection, editor.operations]
  );

  useEffect(() => {
    if (
      typeof localStorage !== 'undefined' &&
      localStorage.getItem('content') != null
    ) {
      setContent(JSON.parse(localStorage.getItem('content') as string));
    }
    setIsMounted(true);
  }, [setContent]);

  if (isMounted) {
    return (
      <Slate editor={editor} initialValue={content} onChange={onChangeHandler}>
        <div className="flex flex-col gap-2" id="wysiwyg-toolbar">
          <Wysiwyg
            isLinkEditorOpen={showLinkEditor}
            handleShowLinkEditor={handleShowLinkEditor}
          />
        </div>
        <section className="w-9/12 rounded px-4 pb-6" id="story-form">
          <LinkEditor
            handleShowLinkEditor={handleShowLinkEditor}
            isVisible={showLinkEditor}
          />
          <Editable
            className="flex flex-col gap-4 outline-none"
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            onFocus={() => setSelection(selection)}
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
            }}
            autoFocus
          />
        </section>
      </Slate>  
    );
  }
}
