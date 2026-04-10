import { useState } from 'react';

type SelectedUserForDelete = {
  userId: number | null;
  userName: string | null;
};

type OpenDeleteModalPayload = {
  userId: number;
  userName: string;
};

const getInitialSelectedUserForDelete = (): SelectedUserForDelete => ({
  userId: null,
  userName: null,
});

export const useDeleteModalState = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUserForDelete, setSelectedUserForDelete] = useState<SelectedUserForDelete>(
    getInitialSelectedUserForDelete(),
  );

  const openDeleteModalForUser = ({ userId, userName }: OpenDeleteModalPayload) => {
    setIsDeleteModalOpen(true);
    setSelectedUserForDelete({
      userId,
      userName,
    });
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedUserForDelete(getInitialSelectedUserForDelete());
  };

  return {
    isDeleteModalOpen,
    selectedUserForDelete,
    openDeleteModalForUser,
    closeDeleteModal,
  };
};
