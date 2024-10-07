import { PagedPostWithNoUser } from './PagedPost';

export type GetPostsByUserId = {
  status: string;
  data: PagedPostWithNoUser;
};