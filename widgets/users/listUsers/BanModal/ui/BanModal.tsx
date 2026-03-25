import { Button, Input, Modal, ModalHeaderWithClose, Select } from '@dangerous-tigers/framehub-ui-kit/components';

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
  isLoading?: boolean;
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
  isLoading = false,
  handleBanUser,
  className,
  ...props
}: Props) {
  const selectOptions = banReasonOptions.map((option) => ({
    ...option,
    value: option.label,
  }));

  const selectValue = banReasonOptions.find((option) => option.value === selectedBanReason)?.label || '';

  const handleReasonSelectChange = (value: string) => {
    const selectedOption = banReasonOptions.find((option) => option.label === value);
    onBanReasonChange(selectedOption?.value || '');
  };

  const disabledBnt =
    isLoading || !userName || !selectedBanReason || (isCustomReasonSelected && !customReasonValue.trim());

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
        
        <Select
          width='100%'
          options={selectOptions}
          value={selectValue}
          disabled={isLoading}
          variant='default'
          onValueChange={handleReasonSelectChange}
        />

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
