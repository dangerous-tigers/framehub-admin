'use client';

import { ChangeEvent, useState } from 'react';
import clsx from 'clsx';

import { SortBy } from '@/app/features/payments/model/types';
import { ConfirmActionModal } from '@/features/viewAllPosts/confirmActionModal';
import { useGetPostsInfinity } from '@/features/viewAllPosts/model/useGetPostsInfinity';
import { Post } from '@/features/viewAllPosts/Post/Post';
import { useConfirmStore } from '@/features/viewAllPosts/useConfirmStore';
import { SortDirection } from '@/generated/graphql';
import { USER_BAN } from '@/queries/banUser';
import { GET_ALL_POSTS } from '@/queries/getAllPosts';
import { USER_UNBAN } from '@/queries/unbanUser';
import { useDebounce } from '@/shared/lib/hooks';
import { useBanReasonSelection } from '@/widgets/users/listUsers/model';
import { useMutation, useQuery } from '@apollo/client/react';
import { Select } from '@dangerous-tigers/framehub-ui-kit/components';
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
  const [post, setPost] = useState<Post>();
  const [expandedPosts, setExpandedPosts] = useState<Record<string, boolean>>({});
  const { open, hide } = useConfirmStore();

  const debouncedSearch = useDebounce(search, 1000);

  const { items, hasMore, cursorRef, refetch } = useGetPostsInfinity({
    pageSize: 12,
    searchTerm: debouncedSearch,
    sortDirection: SortDirection.Asc,
    sortBy: 'createdAt',
  });
  const [userBan, { loading }] = useMutation(USER_BAN);
  const [userUnban, { loading: userUnbanLoading }] = useMutation(USER_UNBAN);

  const {
    banReasonOptions,
    selectedBanReason,
    isCustomReasonSelected,
    onBanReasonChange,
    customReasonValue,
    setCustomReasonValue,
  } = useBanReasonSelection();

  const selectOptions = banReasonOptions.map((option) => ({
    ...option,
    value: option.label,
  }));

  const selectValue = banReasonOptions.find((option) => option.value === selectedBanReason)?.label || '';

  const handleReasonSelectChange = (value: string) => {
    const selectedOption = banReasonOptions.find((option) => option.label === value);
    onBanReasonChange(selectedOption?.value || '');
  };

  const handleUserBanConfirm = async (userId: number) => {
    await userBan({
      variables: {
        banReason: selectValue === 'Another reason' ? customReasonValue : selectValue,
        userId,
      },
    });
    await refetch();
    hide();
  };

  const handleUserUnbanConfirm = async (userId: number | undefined) => {
    if (userId !== undefined)
      await userUnban({
        variables: {
          userId,
        },
      });
    await refetch();
    hide();
  };

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
              setPost={setPost}
            />
          );
        })}

        <div ref={cursorRef} />
        {!hasMore && <div className={s.noMore}>Вы дошли до конца ленты!</div>}
      </div>

      {post?.userBan === null && open && (
        <ConfirmActionModal
          confirmCallback={() => handleUserBanConfirm(post.ownerId)}
          title='Ban user'
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <p className={s.modalText}>
              Are you sure to ban this user, <span>{post.postOwner.userName}</span>
            </p>
            <Select
              width='100%'
              options={selectOptions}
              value={selectValue}
              disabled={false}
              variant='default'
              onValueChange={handleReasonSelectChange}
            />
            {isCustomReasonSelected && (
              <div style={{ width: '100%' }}>
                <Input
                  type='text'
                  placeholder='Describe the reason'
                  value={customReasonValue}
                  onChange={(e) => setCustomReasonValue(e.target.value)}
                />
              </div>
            )}
          </div>
        </ConfirmActionModal>
      )}
      {post?.userBan !== null && open && (
        <ConfirmActionModal
          confirmCallback={() => handleUserUnbanConfirm(post?.ownerId)}
          title='Un-ban user'
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <p className={s.modalText}>
              Are you sure want to un-ban <span>{post?.postOwner.userName}</span>
            </p>
          </div>
        </ConfirmActionModal>
      )}
    </div>
  );
};
