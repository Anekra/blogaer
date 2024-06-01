import { BaseEditor } from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react';

export type UserResponse = {
  status: string;
  message: string;
  data: {
    username: string;
    email: string;
    role: string;
    token: string;
    refresh: string;
  };
};

export type Token = {
  access: string;
  username: string;
  email: string;
  role: string;
};

export type UserSession = {
  username: string;
  email: string;
  role: string;
  token: string;
};

export type SlateEditor = BaseEditor & ReactEditor & HistoryEditor;

export type ImgDimensions = { width: number; height: number };
