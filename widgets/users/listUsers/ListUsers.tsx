'use client';

import Link from 'next/link';
import clsx from 'clsx';

import { BAN_USER } from '@/entities/user/api';
import { useQueryGetListUsers } from '@/entities/users';
import { PaginationTable, PopoverComponent, SortDropdown, useSortUsers } from '@/features/users';
import { formatDate } from '@/shared/lib';
import { useMutation } from '@apollo/client/react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@dangerous-tigers/framehub-ui-kit/components';
import { Block } from '@dangerous-tigers/framehub-ui-kit/icons';

import { BanModal } from './BanModal/ui';
import { useBanModalState, useBanReasonSelection } from './model';

import s from './ListUsers.module.scss';

export const ListUsers = () => {
  const {
    banReasonOptions,
    selectedBanReason,
    isCustomReasonSelected,
    onBanReasonChange,
    resetBanReasonSelection,
    customReasonValue,
    setCustomReasonValue,
    getBanReasonForSubmit,
  } = useBanReasonSelection();
  const { isBanModalOpen, selectedUserForBan, openBanModalForUser, closeBanModal } = useBanModalState({
    resetBanReasonSelection,
  });
  const { data, error, loading, refetch } = useQueryGetListUsers();
  const [handleBanUser, { loading: isLoading }] = useMutation(BAN_USER);
  const { sortPreset, handleSortChange } = useSortUsers();

  const handleBanUserClick = async () => {
    if (selectedUserForBan.userId === null) {
      return;
    }

    const banReason = getBanReasonForSubmit();

    if (!banReason) {
      return;
    }

    await handleBanUser({
      variables: {
        userId: selectedUserForBan.userId,
        banReason,
      },
    });
    await refetch();
    closeBanModal();
  };

  const { page, pageSize, pagesCount } = data?.pagination || {};

  if (loading && data === undefined) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={s.root}>
      <div className={s.header}>
        <SortDropdown
          value={sortPreset}
          onChange={handleSortChange}
        />
      </div>

      <Table style={{ marginTop: '1.5rem' }}>
        <TableHeader>
          <TableRow>
            <TableHead>User ID</TableHead>
            <TableHead>Profile link</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Date added</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className={clsx(user.userBan ? s.banned : s.notBanned)}>
                {user.userBan && (
                  <Block
                    width={24}
                    height={24}
                  />
                )}
                {user.id}
              </TableCell>
              <TableCell className={s.link}>
                <Link
                  target='_blank'
                  href={`users/${user.id}`}
                >
                  {user.userName}
                </Link>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{formatDate(user.createdAt)}</TableCell>
              <TableCell>
                <PopoverComponent
                  isBanned={user.userBan !== null}
                  userId={user.id}
                  setOpenBanModal={() =>
                    openBanModalForUser({
                      userId: user.id,
                      userName: user.userName,
                    })
                  }
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
      {isBanModalOpen && (
        <BanModal
          open={isBanModalOpen}
          onOpenChange={closeBanModal}
          userName={selectedUserForBan.userName || ''}
          isCustomReasonSelected={isCustomReasonSelected}
          onBanReasonChange={onBanReasonChange}
          customReasonValue={customReasonValue}
          onCustomReasonValueChange={setCustomReasonValue}
          banReasonOptions={banReasonOptions}
          selectedBanReason={selectedBanReason}
          isLoading={isLoading}
          handleBanUser={handleBanUserClick}
        />
      )}
    </div>
  );
};
