import { Extension } from '@uiw/react-codemirror';
import { BaseEditor, Descendant, Node, Path } from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react';
import { WysiwygType } from './utils/enums';
import { langs } from '@uiw/codemirror-extensions-langs';

type CustomText = { text: string; [key?: string]: any };
interface CustomElement extends Descendant {
  type: string;
  children: CustomText[];
  align?: string;
  [key?: string]: any;
}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
