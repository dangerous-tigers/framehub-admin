import type { ChangeEvent } from 'react';

import { Button, Input, Modal, ModalHeaderWithClose } from '@dangerous-tigers/framehub-ui-kit/components';

import s from './BanModal.module.scss';

type Props = {
  open: boolean;
  onOpenChange: () => void;
  userName: string;
  isCustomReasonSelected?: boolean;
  className?: string;
  banReasonOptions: {
    label: string;
    value: string;
  }[];
  selectedBanReason: string;
  customReasonValue: string;
  onBanReasonChange: (reason: string) => void;
  onCustomReasonValueChange: (value: string) => void;
  isLodaing?: boolean;
  handleBanUser: () => void;
};
export function BanModal({
  open,
  onOpenChange,
  userName,
  isCustomReasonSelected = false,
  banReasonOptions,
  selectedBanReason,
  customReasonValue,
  onBanReasonChange,
  onCustomReasonValueChange,
  isLodaing = false,
  handleBanUser,
  className,
  ...props
}: Props) {
  const handleReasonSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onBanReasonChange(e.target.value);
  };

  const disabledBnt =
    isLodaing || !userName || !selectedBanReason || (isCustomReasonSelected && !customReasonValue.trim());

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      size='sm'
      header={
        <ModalHeaderWithClose
          title='Ban user'
          onClose={onOpenChange}
        />
      }
      className={className}
      {...props}
    >
      <div className={s.content}>
        <p className={s.text}>
          Are you sure to ban this user <b>{userName}</b>?
        </p>

        <select
          name='ban-reason'
          id='ban-reason'
          value={selectedBanReason}
          onChange={handleReasonSelectChange}
        >
          {banReasonOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        {isCustomReasonSelected && (
          <div className={s.input}>
            <Input
              type='text'
              placeholder='Describe the reason'
              value={customReasonValue}
              onChange={(e) => onCustomReasonValueChange(e.target.value)}
            />
          </div>
        )}
        <div className={s.buttons}>
          <Button onClick={onOpenChange}>No</Button>
          <Button
            disabled={disabledBnt}
            onClick={handleBanUser}
            variant='outline'
          >
            Yes
          </Button>
        </div>
      </div>
    </Modal>
  );
}
