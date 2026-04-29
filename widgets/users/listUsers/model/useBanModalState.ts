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
};

const getInitialSelectedUserForBan = (): SelectedUserForBan => ({
  userId: null,
  userName: null,
});

export const useBanModalState = ({ resetBanReasonSelection }: UseBanModalStateArgs) => {
  const [isBanModalOpen, setIsBanModalOpen] = useState(false);
  const [selectedUserForBan, setSelectedUserForBan] = useState<SelectedUserForBan>(getInitialSelectedUserForBan());

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
