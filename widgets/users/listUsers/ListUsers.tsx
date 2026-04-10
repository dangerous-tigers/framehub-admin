'use client';

import Link from 'next/link';
import clsx from 'clsx';

import { BAN_USER, REMOVE_USER } from '@/entities/user/api';
import { useQueryGetListUsers, useSort } from '@/entities/users';
import { PaginationTable, PopoverComponent } from '@/features/users';
import { ButtonTableHead } from '@/features/users/buttonTableHead/ButtonTableHead';
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
import { DeleteModal } from './DeleteModal/ui';
import { UnbanModal } from './UnbanModal/ui';
import { useBanModalState, useBanReasonSelection, useUnbanModalState } from './model';
import { useBanModalState, useBanReasonSelection, useDeleteModalState } from './model';

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

  const { isUnbanModalOpen, selectedUserForUnban, openUnbanModalForUser, closeUnbanModal } = useUnbanModalState();

  const { isDeleteModalOpen, selectedUserForDelete, openDeleteModalForUser, closeDeleteModal } = useDeleteModalState();
  const { data, error, loading, refetch } = useQueryGetListUsers();
  const [handleBanUser, { loading: isLoading }] = useMutation(BAN_USER);
  const [handleDeleteUser, { loading: isDeleteLoading }] = useMutation(REMOVE_USER);
  const [handleUnbanUser, { loading: isUnbanLoading }] = useMutation(UNBAN_USER);

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


  const handleUnbanUserClick = async () => {
    if (selectedUserForUnban.userId === null) {
      return;
    }

    await handleUnbanUser({
      variables: {
        userId: selectedUserForUnban.userId,
      },
    });
    await refetch();
    closeUnbanModal();
  const handleDeleteUserClick = async () => {
    if (selectedUserForDelete.userId === null) {
      return;
    }

    await handleDeleteUser({
      variables: {
        userId: selectedUserForDelete.userId,
      },
    });
    await refetch();
    closeDeleteModal();
  };

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
                  setOpenDeleteModal={() =>
                    openDeleteModalForUser({
                      userId: user.id,
                      userName: user.userName,
                    })
                  }
                  setOpenBanModal={() =>
                    openBanModalForUser({
                      userId: user.id,
                      userName: user.userName,
                    })
                  }
                  setOpenUnbanModal={() =>
                    openUnbanModalForUser({
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

      {isUnbanModalOpen && (
        <UnbanModal
          open={isUnbanModalOpen}
          onOpenChange={closeUnbanModal}
          userName={selectedUserForUnban.userName || ''}
          isLoading={isUnbanLoading}
          handleUnbanUser={handleUnbanUserClick}

      {isDeleteModalOpen && (
        <DeleteModal
          open={isDeleteModalOpen}
          onOpenChange={closeDeleteModal}
          userName={selectedUserForDelete.userName || ''}
          isLoading={isDeleteLoading}
          handleDeleteUser={handleDeleteUserClick}

        />
      )}
    </div>
  );
};
