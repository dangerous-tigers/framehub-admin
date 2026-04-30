import { useState } from 'react';

type BanReasonOption = {
  label: string;
  value: string;
};

const BAN_REASON_OPTIONS: BanReasonOption[] = [
  { label: 'Bad behavior', value: 'bad_behavior' },
  { label: 'Advertising placement', value: 'advertising_placement' },
  { label: 'Another reason', value: 'custom' },
];

const DEFAULT_BAN_REASON_VALUE = BAN_REASON_OPTIONS[0].value;
const CUSTOM_BAN_REASON_VALUE = 'custom';

export const useBanReasonSelection = () => {
  const [selectedBanReason, setSelectedBanReason] = useState(DEFAULT_BAN_REASON_VALUE);
  const [customReasonValue, setCustomReasonValue] = useState('');

  const resetBanReasonSelection = () => {
    setSelectedBanReason(DEFAULT_BAN_REASON_VALUE);
    setCustomReasonValue('');
  };

  const handleBanReasonChange = (reason: string) => {
    setSelectedBanReason(reason);

    if (reason !== CUSTOM_BAN_REASON_VALUE) {
      setCustomReasonValue('');
    }
  };

  const getBanReasonForSubmit = () => {
    if (selectedBanReason === CUSTOM_BAN_REASON_VALUE) {
      return customReasonValue.trim();
    }

    return BAN_REASON_OPTIONS.find((option) => option.value === selectedBanReason)?.label || '';
  };

  return {
    banReasonOptions: BAN_REASON_OPTIONS,
    selectedBanReason,
    isCustomReasonSelected: selectedBanReason === CUSTOM_BAN_REASON_VALUE,
    onBanReasonChange: handleBanReasonChange,
    resetBanReasonSelection,
    customReasonValue,
    setCustomReasonValue,
    getBanReasonForSubmit,
  };
};
