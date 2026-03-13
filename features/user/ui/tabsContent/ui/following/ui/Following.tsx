import { Pagination } from "@dangerous-tigers/framehub-ui-kit/components";

import { useQueryGetFollowingByUser } from "../model";

import { FollowingTable } from "./FollowersTable";

import s from "./Followers.module.scss";

export function Following({ userId }: { userId: number }) {
  const {
    data,
    loading,
    pageSize,
    onPageSizeChange,
    currentPage,
    setCurrentPage,
    sortBy,
    setCurrentPageAndSortBy,
  } = useQueryGetFollowingByUser({ userId });

  return (
    <div className={s.root}>
      <FollowingTable
        className={s.table}
        followers={data?.getFollowing.items}
        loading={loading}
        pageSize={pageSize}
        sortBy={sortBy}
        setCurrentPageAndSortBy={setCurrentPageAndSortBy}
      />
      {data?.getFollowing.items.length !== 0 && (
        <Pagination
          totalPages={data?.getFollowing?.pagesCount || 0}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          pageSize={pageSize.toString()}
          onPageSizeChange={onPageSizeChange}
        />
      )}
    </div>
  );
}
