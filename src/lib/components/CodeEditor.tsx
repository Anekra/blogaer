import React from 'react';
import ReactCodeMirror from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { useSlate } from 'slate-react';
import { CustomElement } from '../slate';
import { getPath, removeElement, setCodeElement } from '../utils/helper';

export default function CodeEditor({
  element,
}: {
  element: CustomElement;
}) {
  const editor = useSlate();
  const path = getPath(editor, element);

  return (
    <ReactCodeMirror
      data-slate-editor
      value={element.code}
      height="200px"
      theme={'dark'}
      extensions={[langs.javascript()]}
      basicSetup={{
        foldGutter: false,
        dropCursor: true,
        allowMultipleSelections: false,
        indentOnInput: false
      }}
      onChange={(val) => setCodeElement(editor, val)}
      onFocus={() => {
        if (path) editor.select(path)
      }}
      onKeyDown={(e) => {
        if (
          !element.code &&
          e.key.match('Backspace') &&
          editor.children.length > 1
        ) {
          removeElement(editor);
        }
      }}
      autoFocus
    />
  );
}
