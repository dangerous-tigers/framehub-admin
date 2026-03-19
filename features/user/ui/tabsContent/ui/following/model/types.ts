import { Follow } from '@/generated/graphql';

export type GetFollowingByUser = {
  totalCount: number;
  pagesCount: number;
  page: number;
  pageSize: number;
  items: Follow[];
};
