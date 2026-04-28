import { useState } from 'react';

type SelectedUserForBan = {
  userId: number | null;
  userName: string | null;
};

type OpenBanModalPayload = {
  userId: number;
  userName: string;
};

type UseBanModalStateArgs = {
  resetBanReasonSelection: () => void;
  userId?: number | null;
};

const getInitialSelectedUserForBan = (): SelectedUserForBan => ({
  userId: null,
  userName: null,
});

export const useBanModalState = ({ resetBanReasonSelection, userId }: UseBanModalStateArgs) => {
  const [isBanModalOpen, setIsBanModalOpen] = useState(false);
  const [selectedUserForBan, setSelectedUserForBan] = useState<any>(userId ?? getInitialSelectedUserForBan());

  const openBanModalForUser = ({ userId, userName }: OpenBanModalPayload) => {
    setIsBanModalOpen(true);
    resetBanReasonSelection();
    setSelectedUserForBan({
      userId,
      userName,
    });
  };

  const closeBanModal = () => {
    setIsBanModalOpen(false);
    resetBanReasonSelection();
    setSelectedUserForBan(getInitialSelectedUserForBan());
  };

  return {
    isBanModalOpen,
    selectedUserForBan,
    openBanModalForUser,
    closeBanModal,
  };
};
