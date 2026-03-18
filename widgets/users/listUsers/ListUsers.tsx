'use client';

import Link from 'next/link';

import { useQueryGetListUsers, useSort } from '@/entities/users';
import { PaginationTable, PopoverComponent } from '@/features/users';
import { ButtonTableHead } from '@/features/users/buttonTableHead/ButtonTableHead';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@dangerous-tigers/framehub-ui-kit/components';

import s from './ListUsers.module.scss';

export const ListUsers = () => {
  const { data, error, loading } = useQueryGetListUsers();
  const { page, pageSize, pagesCount } = data?.pagination || {};
  const { handleSort } = useSort();

  if (loading && data === undefined) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={s.root}>
      <Table style={{ marginTop: '1.5rem' }}>
        <TableHeader>
          <TableRow>
            <TableHead>User ID</TableHead>
            <TableHead>
              <ButtonTableHead
                label='Profile link'
                onClick={() => handleSort('userName')}
              />
            </TableHead>
            <TableHead>Email</TableHead>
            <TableHead>
              <ButtonTableHead
                label='Date added'
                onClick={() => handleSort('createdAt')}
              />
            </TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell className={s.link}>
                <Link
                  target='_blank'
                  href={`users/${user.id}`}
                >
                  {user.userName}
                </Link>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.createdAt}</TableCell>
              <TableCell>
                <PopoverComponent
                  isBanned={user.userBan !== null}
                  userId={user.id}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationTable
        page={page}
        pageSize={pageSize}
        pageTotal={pagesCount}
      />
    </div>
  );
};
