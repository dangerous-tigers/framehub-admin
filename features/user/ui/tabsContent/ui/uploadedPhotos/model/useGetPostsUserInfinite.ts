import { useCallback } from 'react';

import { useIntersection } from '@/shared/lib/hooks';
import { ImagePost } from '@/types/__generated__/graphql';
import { useQuery } from '@apollo/client/react';

import { GET_POST_BY_USER } from '../api/getPostByUser.query';

export function useGetPostsUserInfinite({ userId }: { userId: number }) {
  const { data, fetchMore, loading } = useQuery<{
    getPostsByUser: {
      items?: ImagePost[] | null;
      totalCount: number;
    };
  }>(GET_POST_BY_USER, {
    variables: { userId },
  });
  const items = data?.getPostsByUser.items ?? [];
  const totalCount = data?.getPostsByUser.totalCount ?? 0;
  const hasMore = items.length < totalCount;
  const lastPostId = items[items.length - 1]?.id ?? null;

  const fetchNextPage = useCallback(() => {
    if (loading) return;
    if (!hasMore || !lastPostId) {
      return;
    }

    fetchMore({
      variables: {
        endCursorId: lastPostId,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        const prevItems = prev.getPostsByUser.items ?? [];
        const nextItems = fetchMoreResult.getPostsByUser.items ?? [];

        if (nextItems.length === 0) {
          return prev;
        }

        return {
          getPostsByUser: {
            ...fetchMoreResult.getPostsByUser,
            items: [...prevItems, ...nextItems],
          },
        };
      },
    });
  }, [fetchMore, hasMore, lastPostId]);

  const cursorRef = useIntersection(fetchNextPage);

  return { items, loading, cursorRef, hasMore };
}
