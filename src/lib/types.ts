import { BaseEditor } from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react';

export type UserResponse = {
  status: string;
  message: string;
  data: {
    username: string;
    access: string;
    email: string;
    role: string;
    refresh: string;
  };
};

export type RefreshTokenResponse = {
  status: string;
  message: string;
  data: {
    username: string;
    access: string;
    refresh: string;
  };
};

export type Token = {
  access: string;
  refresh: string;
  username: string;
  email: string;
  role: string;
  expires: number;
};

export type UserSession = {
  username: string;
  email: string;
  role: string;
  image: string;
  refresh: string;
  expires: number;
};

export type PublishPost = {
  content: any;
  tags: string[];
}

export type SlateEditor = BaseEditor & ReactEditor & HistoryEditor;

export type ImgDimensions = { width: number; height: number };
