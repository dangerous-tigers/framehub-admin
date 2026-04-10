import { Button, Modal, ModalHeaderWithClose } from '@dangerous-tigers/framehub-ui-kit/components';

import s from './DeleteModal.module.scss';

type Props = {
  open: boolean;
  onOpenChange: () => void;
  userName: string;
  isLoading?: boolean;
  handleDeleteUser: () => void;
};

export function DeleteModal({ open, onOpenChange, userName, isLoading = false, handleDeleteUser }: Props) {
  const isConfirmDisabled = isLoading || !userName;

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      size='sm'
      header={
        <ModalHeaderWithClose
          title='Delete user'
          onClose={onOpenChange}
        />
      }
    >
      <div className={s.content}>
        <p className={s.text}>
          Are you sure you want to delete <b>{userName}</b>?
        </p>
        <div className={s.buttons}>
          <Button onClick={onOpenChange}>No</Button>
          <Button
            disabled={isConfirmDisabled}
            onClick={handleDeleteUser}
            variant='outline'
          >
            Yes
          </Button>
        </div>
      </div>
    </Modal>
  );
}
