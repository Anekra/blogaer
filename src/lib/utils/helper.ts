import { BaseRange, Editor, Element, Path, Range, Transforms } from 'slate';
import { SlateEditor } from '../types';
import { CustomElement } from '../slate';
import { HeadingSize, WysiwygAlign, WysiwygStyle, WysiwygType } from '../enums';
import { ReactEditor } from 'slate-react';
import { LIST_TYPES, NOT_ALIGNABLE, POSITION_TYPES } from '../constants';

export function addElement(editor: SlateEditor, element: CustomElement) {
  Transforms.insertNodes(editor, element);
}

export function addLink(
  editor: SlateEditor,
  isCollapsed: boolean,
  linkUrl: string = '',
  linkText: string = 'link'
) {
  if (isCollapsed) {
    addElement(editor, {
      type: WysiwygStyle.Link,
      children: [{ text: linkText }],
      url: linkUrl
    });
  } else {
    Transforms.wrapNodes(
      editor,
      {
        type: WysiwygStyle.Link,
        children: [{ text: linkText.trim() }],
        url: linkUrl
      },
      { split: true }
    );
  }
}

export function removeElement(editor: SlateEditor, at?: BaseRange) {
  const { selection } = editor;
  if (!selection) return;
  Transforms.removeNodes(editor, { at });
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

export function getElementAlignment(editor: SlateEditor) {
  const element = getElement(editor);
  if (!element) return;
  return element.align;
}

export function getElementHeadingSize(editor: SlateEditor) {
  const element = getElement(editor);
  if (!element) return;
  return element.headingSize;
}

export function getLinkElement(editor: SlateEditor) {
  const linkElement = Editor.above(editor, {
    match: (n) => (n as CustomElement).type === WysiwygStyle.Link
  });

  return linkElement;
}

export function setCodeElement(editor: SlateEditor, value: string) {
  const { selection } = editor;
  if (!selection) return;

  Transforms.setNodes(editor, {
    type: WysiwygType.Code,
    code: value
  });
}

export function setImageCaption(editor: SlateEditor, caption: string) {
  Transforms.setNodes(editor, { imageCaption: caption });
}

export function selectElement(editor: SlateEditor, position: Path) {
  Transforms.select(editor, position);
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

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      Element.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true
  });

  if (type === WysiwygType.Heading) {
    Transforms.setNodes(editor, { type, headingSize });
  } else if (type === WysiwygType.Code) {
    Transforms.setNodes(editor, {
      type,
      code: '',
      position: selection.anchor.path
    });
  } else if (LIST_TYPES.includes(type)) {
    Transforms.unsetNodes(editor, 'align');
    Transforms.setNodes(editor, { type: WysiwygType.List });
    Transforms.wrapNodes(editor, {
      type,
      align: WysiwygAlign.Left,
      children: []
    });
  } else if (type === WysiwygType.Image) {
    Transforms.setNodes(editor, {
      type,
      url: element.url,
      caption: element.caption,
      position: selection.anchor.path
    });
  } else if (type === WysiwygType.Divider) {
    Transforms.setNodes(editor, { type, position: selection.anchor.path });
  } else {
    Transforms.setNodes(editor, { type, align: WysiwygAlign.Left });
  }

  if ('headingSize' in element && type !== WysiwygType.Heading) {
    Transforms.unsetNodes(editor, 'headingSize');
  }

  if ('code' in element) {
    Transforms.unsetNodes(editor, 'code');
  }

  if ('position' in element && !POSITION_TYPES.includes(type)) {
    Transforms.unsetNodes(editor, 'position');
  }

  if (NOT_ALIGNABLE.includes(type)) {
    Transforms.unsetNodes(editor, 'align');
  }

  focusEditor(editor);
}

export function toggleStyle(editor: SlateEditor, style: string) {
  const isActive = isStyleActive(editor, style);

  if (isActive) Editor.removeMark(editor, style);
  else Editor.addMark(editor, style, true);

  focusEditor(editor);
}

export function toggleAlign(editor: SlateEditor, align: WysiwygAlign) {
  Transforms.setNodes(editor, { align });
  focusEditor(editor);
}

export function toggleLink(editor: SlateEditor, linkUrl?: string) {
  const { selection } = editor;
  if (!selection) return;

  if (isLinkSelected(editor)) {
    Transforms.unwrapNodes(editor, {
      match: (n) => Element.isElement(n) && n.type === WysiwygStyle.Link
    });
  } else {
    const isSelectionCollapsed = Range.isCollapsed(selection);

    if (isSelectionCollapsed) addLink(editor, true, linkUrl);
    else {
      const linkText = getElement(editor)?.children[0].text;
      addLink(editor, false, linkUrl, linkText);
    }
  }

  focusEditor(editor);
}

export function isStyleActive(editor: SlateEditor, style: string) {
  const styles = Editor.marks(editor);
  return styles ? styles[style] === true : false;
}

export function isLinkSelected(editor: SlateEditor) {
  const { selection } = editor;
  if (!selection) return;

  return (
    Editor.above(editor, {
      match: (n) => (n as CustomElement).type === WysiwygStyle.Link
    }) != null
  );
}

export function collapseSelection(editor: SlateEditor) {
  Transforms.collapse(editor);
}

export function focusEditor(editor: SlateEditor) {
  ReactEditor.focus(editor);
}

export function getHeadingSizeKey(value: HeadingSize): string {
  return Object.keys(HeadingSize)[Object.values(HeadingSize).indexOf(value)];
}

export function convertFileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result as string);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
