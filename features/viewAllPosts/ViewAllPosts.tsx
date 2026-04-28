'use client';

import { ChangeEvent, useState } from 'react';
import clsx from 'clsx';

import { SortBy } from '@/app/features/payments/model/types';
import { useGetPostsInfinity } from '@/features/viewAllPosts/model/useGetPostsInfinity';
import { Post } from '@/features/viewAllPosts/Post/Post';
import { SortDirection } from '@/generated/graphql';
import { GET_ALL_POSTS } from '@/queries/getAllPosts';
import { useDebounce } from '@/shared/lib/hooks';
import { useQuery } from '@apollo/client/react';
import { Input } from '@dangerous-tigers/framehub-ui-kit/components/input/ui/Input';

import s from './ViewAllPosts.module.scss';

export const usePaginationQuery = ({
  endCursorPostId,
  pageSize,
  searchTerm,
  sortDirection,
  sortBy,
}: {
  endCursorPostId: number;
  pageSize: number;
  searchTerm: string;
  sortDirection: SortDirection;
  sortBy: SortBy;
}) => {
  const { data, loading, refetch } = useQuery(GET_ALL_POSTS, {
    variables: {
      pageSize,
      endCursorPostId,
      sortBy,
      sortDirection,
      searchTerm,
    },
  });
  return {
    posts: data?.getPosts.items,
    totalCount: data?.getPosts.totalCount,
    refetch,
    loading,
  };
};

export const ViewAllPosts = () => {
  const [search, setSearch] = useState('');
  const [expandedPosts, setExpandedPosts] = useState<Record<string, boolean>>({});

  const debouncedSearch = useDebounce(search, 1000);

  const { items, hasMore, cursorRef, refetch } = useGetPostsInfinity({
    pageSize: 12,
    searchTerm: debouncedSearch,
    sortDirection: SortDirection.Asc,
    sortBy: 'createdAt',
  });

  console.log(items);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  if (!items?.length) return null;

  const toggleExpanded = (postId: number) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  if (!items?.length) {
    return (
      <div className={s.main}>
        <Input
          type='search'
          value={search}
          onChange={handleSearch}
        />
      </div>
    );
  }

  return (
    <div className={s.main}>
      <Input
        type='search'
        value={search}
        onChange={handleSearch}
      />
      <div className={clsx(s.postsGrid)}>
        {items?.map((post) => {
          return (
            <Post
              key={post.id}
              post={post}
              refetch={refetch}
              expandedPosts={expandedPosts}
              toggleExpanded={toggleExpanded}
            />
          );
        })}
        <div ref={cursorRef} />
        {!hasMore && <div className={s.noMore}>Вы дошли до конца ленты!</div>}
      </div>
    </div>
  );
};
