import { Pagination } from '@dangerous-tigers/framehub-ui-kit/components';

import { useQueryGetFollowersByUser } from '../model';

import { FollowersTable } from './FollowersTable';

import s from './Followers.module.scss';

export function Followers({ userId }: { userId: number }) {
  const { data, loading, pageSize, onPageSizeChange, currentPage, setCurrentPage, sortBy, setCurrentPageAndSortBy } =
    useQueryGetFollowersByUser({ userId });

  return (
    <div className={s.root}>
      <FollowersTable
        className={s.table}
        followers={data?.getFollowers.items}
        loading={loading}
        pageSize={pageSize}
        sortBy={sortBy}
        setCurrentPageAndSortBy={setCurrentPageAndSortBy}
      />
      {data?.getFollowers.items.length !== 0 && (
        <Pagination
          totalPages={data?.getFollowers?.pagesCount || 0}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          pageSize={pageSize.toString()}
          onPageSizeChange={onPageSizeChange}
        />
      )}
    </div>
  );
}
