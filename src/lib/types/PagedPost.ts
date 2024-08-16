import { Post, PostWithNoUser } from "./Post";

export type PagedPost = {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  posts: Post[]
}
export type PagedPostWithNoUser = {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  posts: PostWithNoUser[]
}