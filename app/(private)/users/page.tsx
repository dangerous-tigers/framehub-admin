// Users Page (App Router)

"use client";

import { UserAvatar, UserStatus } from "@/entities/user";
import {
  SortableHeader,
  SortDirection,
  SortField,
  SortPreset,
  useSortUsers,
} from "@/features/users/sort-users";
import {
  GET_USERS,
  GetUsersQuery,
  GetUsersQueryVariables,
} from "@/queries/getUsers";
import { usePagination } from "@/shared/lib/hooks/usePagination";
import { useQuery } from "@apollo/client/react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@dangerous-tigers/framehub-ui-kit/components";

import styles from "./page.module.scss";

type UserType = NonNullable<
  NonNullable<GetUsersQuery["getUsers"]>["users"]
>[number];

export default function Users() {
  const { sortBy, sortDirection, handleSortChange } = useSortUsers("date-desc");
  const { page, setPage, pageSize } = usePagination({
    initialPage: 1,
    initialPageSize: 8,
  });

  const handleSort = (field: SortField, direction: SortDirection) => {
    const presetMap: Record<`${SortField}-${SortDirection}`, SortPreset> = {
      "userName-asc": "name-asc",
      "userName-desc": "name-desc",
      "createdAt-asc": "date-asc",
      "createdAt-desc": "date-desc",
    };

    const newPreset = presetMap[`${field}-${direction}`];
    handleSortChange(newPreset);
  };

  const { data, loading } = useQuery<GetUsersQuery, GetUsersQueryVariables>(
    GET_USERS,
    {
      variables: {
        pageNumber: page,
        pageSize,
        sortBy,
        sortDirection,
      },
    },
  );

  const users = data?.getUsers.users ?? [];
  const pagination = data?.getUsers.pagination;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Users List</h1>
      </header>

      <div className={styles.table}>
        <Table>
          <SortableHeader
            sortBy={{ field: sortBy, direction: sortDirection }}
            onSort={handleSort}
          />
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className={styles["table__loading-cell"]}
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className={styles["table__empty-cell"]}>
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user: UserType) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className={styles["user-cell"]}>
                      <UserAvatar
                        src={user.profile.avatars?.[0]?.url}
                        alt={user.userName}
                        size={40}
                      />
                      <span className={styles["user-cell__name"]}>
                        {user.userName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <UserStatus isBanned={!!user.userBan} />
                  </TableCell>
                  <TableCell>
                    <Button variant="text">View</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && pagination.pagesCount > 1 && (
        <footer className={styles.pagination}>
          <button
            className={styles.pagination__button}
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            type="button"
          >
            ‹
          </button>

          <div className={styles.pagination__pages}>
            {renderPageButtons(page, pagination.pagesCount, setPage)}
          </div>

          <button
            className={styles.pagination__button}
            onClick={() => setPage(page + 1)}
            disabled={page === pagination.pagesCount}
            type="button"
          >
            ›
          </button>

          <div className={styles.pagination__controls}>
            <span className={styles.pagination__label}>Show</span>
            <select
              className={styles.pagination__select}
              value={pageSize}
              onChange={() => {
                setPage(1);
              }}
            >
              <option value={8}>8</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className={styles.pagination__label}>on page</span>
          </div>
        </footer>
      )}
    </div>
  );
}

function renderPageButtons(
  currentPage: number,
  totalPages: number,
  setPage: (page: number) => void,
) {
  const buttons: React.ReactNode[] = [];
  const maxVisible = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  const endPage = Math.min(totalPages, startPage + maxVisible - 1);

  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  if (startPage > 1) {
    buttons.push(
      <button
        key={1}
        className={`${styles.pagination__button} ${1 === currentPage ? styles["pagination__button--active"] : ""}`}
        onClick={() => setPage(1)}
        type="button"
      >
        1
      </button>,
    );
    if (startPage > 2) {
      buttons.push(
        <span key="start-ellipsis" style={{ color: "#808080" }}>
          ...
        </span>,
      );
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    buttons.push(
      <button
        key={i}
        className={`${styles.pagination__button} ${i === currentPage ? styles["pagination__button--active"] : ""}`}
        onClick={() => setPage(i)}
        type="button"
      >
        {i}
      </button>,
    );
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      buttons.push(
        <span key="end-ellipsis" style={{ color: "#808080" }}>
          ...
        </span>,
      );
    }
    buttons.push(
      <button
        key={totalPages}
        className={`${styles.pagination__button} ${totalPages === currentPage ? styles["pagination__button--active"] : ""}`}
        onClick={() => setPage(totalPages)}
        type="button"
      >
        {totalPages}
      </button>,
    );
  }

  return buttons;
}
