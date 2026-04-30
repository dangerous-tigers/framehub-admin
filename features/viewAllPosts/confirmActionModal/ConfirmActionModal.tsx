'use client';

import { ReactNode } from 'react';

import { useConfirmStore } from '@/features/viewAllPosts/useConfirmStore';
import { Button, Modal, ModalHeaderWithClose } from '@dangerous-tigers/framehub-ui-kit/components';

import s from './ConfirmActionModal.module.scss';

type Props = {
  children: ReactNode;
  isPending?: boolean;
  title: string;
  confirmCallback: () => void;
};
export const ConfirmActionModal = ({ children, isPending, confirmCallback, title }: Props) => {
  const { open, hide } = useConfirmStore();

  const handleClose = () => {
    hide();
  };

  const handleConfirm = () => {
    confirmCallback();
    hide();
  };

  return (
    <Modal
      open={open}
      onOpenChange={hide}
      size='sm'
      header={
        <ModalHeaderWithClose
          title={title}
          onClose={() => handleClose}
        />
      }
    >
      <div className={s.modalContent}>
        {children}
        <div className={s.buttonContainer}>
          <Button
            fullWidth
            disabled={isPending}
            variant='outline'
            onClick={handleClose}
          >
            no
          </Button>
          <Button
            fullWidth
            disabled={isPending}
            variant='primary'
            onClick={handleConfirm}
          >
            yes
          </Button>
        </div>
      </div>
    </Modal>
  );
};
