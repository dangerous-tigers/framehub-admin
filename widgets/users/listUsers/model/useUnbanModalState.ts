import { useState } from 'react';

type SelectedUserForUnban = {
  userId: number | null;
  userName: string | null;
};

type OpenUnbanModalPayload = {
  userId: number;
  userName: string;
};

const getInitialSelectedUserForUnban = (): SelectedUserForUnban => ({
  userId: null,
  userName: null,
});

export const useUnbanModalState = () => {
  const [isUnbanModalOpen, setIsUnbanModalOpen] = useState(false);
  const [selectedUserForUnban, setSelectedUserForUnban] = useState<SelectedUserForUnban>(
    getInitialSelectedUserForUnban(),
  );

  const openUnbanModalForUser = ({ userId, userName }: OpenUnbanModalPayload) => {
    setIsUnbanModalOpen(true);
    setSelectedUserForUnban({
      userId,
      userName,
    });
  };

  const closeUnbanModal = () => {
    setIsUnbanModalOpen(false);
    setSelectedUserForUnban(getInitialSelectedUserForUnban());
  };

  return {
    isUnbanModalOpen,
    selectedUserForUnban,
    openUnbanModalForUser,
    closeUnbanModal,
  };
};
