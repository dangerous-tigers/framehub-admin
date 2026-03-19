import { QueryGetFollowersArgs } from '@/generated/graphql';
import { useQuery } from '@apollo/client/react';

import { usePaginationState } from '../../../model';
import { useTableSort } from '../../../model/useTableSort';
import { GET_FOLLOWERS_BY_USER } from '../api';

import { GetFollowersByUser } from './types';

export const useQueryGetFollowersByUser = ({ userId }: { userId: number }) => {
  const { pageSize, onPageSizeChange, currentPage, setCurrentPage } = usePaginationState();
  const { sortBy, setCurrentPageAndSortBy } = useTableSort(setCurrentPage);

  const { data, loading } = useQuery<
    {
      getFollowers: GetFollowersByUser;
    },
    QueryGetFollowersArgs
  >(GET_FOLLOWERS_BY_USER, {
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
