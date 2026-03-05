// =============================================
// Users Page (App Router)
// =============================================

'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import {
  Button,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@dangerous-tigers/framehub-ui-kit/components';

import { GET_USERS, GetUsersQuery, GetUsersQueryVariables } from '@/queries/getUsers';
import { useSortUsers, SortPreset } from '@/features/users/sort-users';
import { usePagination } from '@/shared/lib/hooks/usePagination';
import { UserAvatar, UserStatus } from '@/entities/user';

import styles from './page.module.scss';

export default function Users() {
  const { sortBy, sortDirection, sortPreset, handleSortChange } = useSortUsers('date-desc');
  const { page, setPage, pageSize } = usePagination({ initialPage: 1, initialPageSize: 8 });

  const { data, loading } = useQuery<GetUsersQuery, GetUsersQueryVariables>(GET_USERS, {
    variables: {
      pageNumber: page,
      pageSize,
      sortBy,
      sortDirection,
    },
  });

  const users = data?.getUsers.users ?? [];
  const pagination = data?.getUsers.pagination;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Users List</h1>
        <div className={styles.controls}>
          <Select
            options={[
              { value: 'date-desc', label: 'Newest first' },
              { value: 'date-asc', label: 'Oldest first' },
              { value: 'name-asc', label: 'From A to Z' },
              { value: 'name-desc', label: 'From Z to A' },
            ]}
            value={sortPreset}
            onValueChange={(value) => handleSortChange(value as SortPreset)}
            disabled={false}
            variant="default"
            width="200px"
          />
        </div>
      </header>

      <div className={styles.table}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Registered</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className={styles['table__loading-cell']}>
                  Loading...
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className={styles['table__empty-cell']}>
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className={styles['user-cell']}>
                      <UserAvatar
                        src={user.profile.avatars?.[0]?.url}
                        alt={user.userName}
                        size={40}
                      />
                      <span className={styles['user-cell__name']}>{user.userName}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <UserStatus isBanned={!!user.userBan} />
                  </TableCell>
                  <TableCell>
                    <Button variant="text" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && pagination.pagesCount > 1 && (
        <footer className={styles.pagination}>
          <Button
            variant="outline"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className={styles['pagination__info']}>
            Page {page} of {pagination.pagesCount}
          </span>
          <Button
            variant="outline"
            onClick={() => setPage(page + 1)}
            disabled={page === pagination.pagesCount}
          >
            Next
          </Button>
        </footer>
      )}
    </div>
  );
}
