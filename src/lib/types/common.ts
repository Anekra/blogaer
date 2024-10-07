import type { BaseEditor } from 'slate';
import type { HistoryEditor } from 'slate-history';
import type { ReactEditor } from 'slate-react';
import { Post, PostWithNoUser } from './dto/Post';

export type Session = {
  username: string;
  email: string;
  role: string;
  exp: number;
  img?: string;
} | null;

export type SessionCookie = {
  username: string;
  email: string;
  role: string;
  img?: string;
} | null;

export type Auth = {
  username: string;
  email: string;
  role: string;
  img?: string;
  access: string;
  refresh: string;
};

export type AuthJson = {
  status: string;
  message: string;
  data: Auth;
};

export type RefreshToken = {
  username: string;
  access: string;
  refresh: string;
};

export type RefreshTokenJson = {
  status: string;
  message: string;
  data: RefreshToken;
};

export type PublishPost = {
  id: string;
  title: string;
  content: any;
  tags?: string[];
};

export type Draft = {
  id: string;
  title: string;
  content?: any;
  tags?: string[];
};

export type EditPost = {
  slugOrId: string;
  title: string;
  content: any;
  tags: string[];
};

export type CurrentPost = Post | PostWithNoUser;

export type SlateEditor = BaseEditor & ReactEditor & HistoryEditor;
