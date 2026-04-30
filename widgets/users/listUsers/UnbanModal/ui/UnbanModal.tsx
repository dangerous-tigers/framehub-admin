import { Button, Modal, ModalHeaderWithClose } from '@dangerous-tigers/framehub-ui-kit/components';

import s from './UnbanModal.module.scss';

type Props = {
  open: boolean;
  onOpenChange: () => void;
  userName: string;
  isLoading?: boolean;
  handleUnbanUser: () => void;
};

export function UnbanModal({ open, onOpenChange, userName, isLoading = false, handleUnbanUser }: Props) {
  const isConfirmDisabled = isLoading || !userName;

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      size='sm'
      header={
        <ModalHeaderWithClose
          title='Un-ban user'
          onClose={onOpenChange}
        />
      }
    >
      <div className={s.content}>
        <p className={s.text}>
          Are you sure want to un-ban <b>{userName}</b>?
        </p>
        <div className={s.buttons}>
          <Button onClick={onOpenChange}>No</Button>
          <Button
            disabled={isConfirmDisabled}
            onClick={handleUnbanUser}
            variant='outline'
          >
            Yes
          </Button>
        </div>
      </div>
    </Modal>
  );
}
