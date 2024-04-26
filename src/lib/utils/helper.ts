import { BaseRange, BaseSelection, Editor, Element, Transforms } from 'slate';
import { SlateEditor } from '../types';
import { CustomElement } from '../slate';
import { HeadingSize, WysiwygAlign, WysiwygType } from '../enums';
import { ReactEditor } from 'slate-react';
import { LIST_TYPES } from '../constants';

export function addElement(editor: SlateEditor, element: CustomElement) {
  Transforms.insertNodes(editor, element);
}

export function removeElement(editor: SlateEditor, at?: BaseRange) {
  const { selection } = editor;
  if (!selection) return;

  Transforms.removeNodes(editor, { at });
}

export function toggleType(
  editor: SlateEditor,
  type: string,
  headingSize?: string
) {
  const { selection } = editor;
  if (!selection) return;
  const element = getElement(editor);
  if (!element) return;

  if (
    (element.type === WysiwygType.ListBullets ||
      element.type === WysiwygType.ListNumbers) &&
    !LIST_TYPES.includes(type)
  ) {
    console.log(`test0: ${type}`);
    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        LIST_TYPES.includes(n.type),
      split: true
    });
  }

  if (type === WysiwygType.Heading) {
    console.log(`test1: ${type}`);
    Transforms.setNodes(editor, { type, headingSize });
  } else if (type === WysiwygType.Code) {
    console.log(`test2: ${type}`);
    Transforms.setNodes(editor, { type, code: '' });
  } else if (LIST_TYPES.includes(type)) {
    console.log(`test3: ${type}`);
    Transforms.unsetNodes(editor, 'align');
    Transforms.setNodes(editor, { type: WysiwygType.List });
    Transforms.wrapNodes(editor, {
      type,
      align: WysiwygAlign.Left,
      children: []
    });
  } else if (type === WysiwygType.Divider) {
    console.log(`test4: ${type}`);
    Transforms.setNodes(editor, { type, position: selection.anchor.path });
  } else {
    console.log(`test5: ${type}`);
    Transforms.setNodes(editor, { type });
  }

  if (element.headingSize) {
    console.log(`test6: ${type}`);
    Transforms.unsetNodes(editor, 'headingSize');
  }

  if ('code' in element) {
    console.log(`test7: ${type}`);
    Transforms.unsetNodes(editor, 'code');
  }

  focusEditor(editor);
}

export function toggleStyle(editor: SlateEditor, style: string) {
  const isActive = isStyleActive(editor, style);

  if (isActive) Editor.removeMark(editor, style);
  else Editor.addMark(editor, style, true);
}

export function isStyleActive(editor: SlateEditor, style: string) {
  const styles = Editor.marks(editor);
  return styles ? styles[style] === true : false;
}

export function getElement(editor: SlateEditor): CustomElement | undefined {
  const { selection } = editor;
  if (!selection) return;
  const element = editor.children[selection.focus.path[0]];
  return element as CustomElement;
}

export function getElementType(editor: SlateEditor) {
  const element = getElement(editor);
  if (!element) return;
  return element.type;
}

export function getElementHeadingSize(editor: SlateEditor) {
  const element = getElement(editor);
  if (!element) return;
  return element.headingSize;
}

export function collapseSelection(editor: SlateEditor) {
  Transforms.collapse(editor);
}

export function wrapLink(
  editor: SlateEditor,
  selection: BaseSelection,
  link: string,
  text: string
) {}

export function setCodeElement(editor: SlateEditor, value: string) {
  const { selection } = editor;
  if (!selection) return;

  Transforms.setNodes(editor, {
    type: WysiwygType.Code,
    code: value
  });
}

export function focusEditor(editor: SlateEditor) {
  ReactEditor.focus(editor);
}

export function getHeadingSizeKey(value: HeadingSize): string {
  return Object.keys(HeadingSize)[Object.values(HeadingSize).indexOf(value)];
}
