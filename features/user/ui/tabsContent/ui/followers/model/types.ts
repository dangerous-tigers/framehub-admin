import { Follow } from '@/generated/graphql';

export type GetFollowersByUser = {
  totalCount: number;
  pagesCount: number;
  page: number;
  pageSize: number;
  items: Follow[];
};
