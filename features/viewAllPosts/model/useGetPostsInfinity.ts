import { useCallback } from 'react';

import { SortDirection } from '@/generated/graphql';
import { GET_ALL_POSTS } from '@/queries/getAllPosts';
import { GetPostsQuery, GetPostsQueryVariables } from '@/queries/getAllPosts.generated';
import { useIntersection } from '@/shared/lib/hooks';
import { useQuery } from '@apollo/client/react';

type Params = {
  pageSize: number;
  sortBy: string;
  sortDirection: SortDirection;
  searchTerm: string;
};

export function useGetPostsInfinity({ pageSize, sortBy, sortDirection, searchTerm }: Params) {
  const { data, fetchMore, loading, refetch } = useQuery<GetPostsQuery, GetPostsQueryVariables>(GET_ALL_POSTS, {
    variables: {
      pageSize,
      sortBy,
      sortDirection,
      searchTerm,
    },
  });

  const items = data?.getPosts.items ?? [];
  const totalCount = data?.getPosts.totalCount || 0;
  const hasMore = items.length < totalCount;
  const lastPostId = items[items.length - 1]?.id ?? null;

  const fetchNextPage = useCallback(() => {
    if (loading) return;
    if (!hasMore || !lastPostId) {
      return;
    }

    fetchMore({
      variables: {
        endCursorPostId: lastPostId,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        const prevItems = prev.getPosts.items;
        const nextItems = fetchMoreResult.getPosts.items;

        if (nextItems.length === 0) {
          return prev;
        }

        return {
          getPosts: {
            ...fetchMoreResult.getPosts,
            items: [...prevItems, ...nextItems],
          },
        };
      },
    });
  }, [fetchMore, hasMore, lastPostId, loading]);

  const cursorRef = useIntersection(fetchNextPage);

  return { items, loading, cursorRef, hasMore, refetch };
}
