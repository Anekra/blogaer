import { Extension } from '@uiw/react-codemirror';
import { BaseEditor } from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react';
import { WysiwygType } from './enums';
import { langs } from '@uiw/codemirror-extensions-langs';

type CustomText = { text: string; [key?: string]: any };
type CustomElement = {
  type: string;
  children: CustomText[];
  align?: string;
  [key?: string]: any;
};

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
