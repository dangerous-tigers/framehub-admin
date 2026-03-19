import { Follow } from '@/types/__generated__/graphql';

export type GetFollowingByUser = {
  totalCount: number;
  pagesCount: number;
  page: number;
  pageSize: number;
  items: Follow[];
};
