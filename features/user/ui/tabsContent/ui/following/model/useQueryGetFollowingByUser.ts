import { QueryGetFollowersArgs } from '@/types/__generated__/graphql';
import { useQuery } from '@apollo/client/react';

import { usePaginationState, useTableSort } from '../../../model/';
import { GET_FOLLOWING_BY_USER } from '../api/getFollowingByUser.query';

import { GetFollowingByUser } from './types';

export const useQueryGetFollowingByUser = ({ userId }: { userId: number }) => {
  const { pageSize, onPageSizeChange, currentPage, setCurrentPage } = usePaginationState();
  const { sortBy, setCurrentPageAndSortBy } = useTableSort(setCurrentPage);

  const { data, loading } = useQuery<
    {
      getFollowing: GetFollowingByUser;
    },
    QueryGetFollowersArgs
  >(GET_FOLLOWING_BY_USER, {
    variables: {
      userId: userId,
      pageSize: pageSize,
      pageNumber: currentPage,
      sortBy: sortBy.field,
      sortDirection: sortBy.direction as 'asc' | 'desc',
    },
  });

  return {
    data,
    loading,
    pageSize,
    onPageSizeChange,
    currentPage,
    setCurrentPage,
    sortBy,
    setCurrentPageAndSortBy,
  };
};
