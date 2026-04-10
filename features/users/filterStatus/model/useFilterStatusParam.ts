'use client';

import { useCallback, useMemo } from 'react';

import { useSearchParamWithKey } from '@/entities/users/model/searchParams/useSearchParamWithKey';

const FILTER_PARAM_KEY = 'fs';

export const FILTER_OPTIONS = [
  { label: 'Not selected', value: 'Not Selected', param: '' },
  { label: 'Blocked', value: 'Blocked', param: 'BLOCKED' },
  { label: 'Not blocked', value: 'Not Blocked', param: 'UNBLOCKED' },
];

type FilterOption = (typeof FILTER_OPTIONS)[number];
type UiFilterValue = FilterOption['value'];

const DEFAULT_FILTER = FILTER_OPTIONS[0].value;

const isUiFilterValue = (value: string): value is UiFilterValue => {
  return FILTER_OPTIONS.some((option) => option.value === value);
};

export const useFilterStatusParam = () => {
  const { initialValue: rawInitialValue, syncSearchParam } = useSearchParamWithKey({
    key: FILTER_PARAM_KEY,
  });

  const initialValue = useMemo(() => {
    const normalizedValue = rawInitialValue.toUpperCase();
    const matchedOption = FILTER_OPTIONS.find((option) => {
      if (normalizedValue === 'ALL') {
        return option.param === '';
      }

      return option.param === normalizedValue;
    });

    if (!matchedOption) {
      return DEFAULT_FILTER;
    }

    return matchedOption.value;
  }, [rawInitialValue]);

  const syncFilterStatusParam = useCallback(
    (value: string) => {
      if (!isUiFilterValue(value)) {
        syncSearchParam('');
        return;
      }

      const selectedOption = FILTER_OPTIONS.find((option) => option.value === value);

      syncSearchParam(selectedOption?.param ?? '');
    },
    [syncSearchParam],
  );

  return {
    initialValue,
    syncFilterStatusParam,
  };
};
