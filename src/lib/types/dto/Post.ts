type Comment = {
  commentId: string;
  commentText: string;
};
type Reaction = {
  reactionId: string;
  reactionList: string[];
};
export type Post = {
  id: string;
  username: string;
  userImg?: string;
  title: string;
  content: any[];
  categories: string[];
  tags: string[];
  comments: Comment[];
  reactions: Reaction[];
  createdAt: string;
  updatedAt: string;
};
export type PostWithNoUser = {
  id: string;
  title: string;
  content: any[];
  categories: string[];
  tags: string[];
  comments: Comment[];
  reactions: Reaction[];
  createdAt: string;
  updatedAt: string;
};
