'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { useDebounce } from '@/shared/lib/hooks';
import { Input } from '@dangerous-tigers/framehub-ui-kit/components';

import { useSearchParamWithKey } from '../model/useSearchParamWithKey';

export const SearchComponent = () => {
  const { initialValue, syncSearchParam } = useSearchParamWithKey();
  const [value, setValue] = useState(initialValue);
  const debouncedValue = useDebounce(value);
  const isSyncingFromUrlRef = useRef(true);

  useEffect(() => {
    isSyncingFromUrlRef.current = true;
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (isSyncingFromUrlRef.current) {
      if (debouncedValue === initialValue) {
        isSyncingFromUrlRef.current = false;
      }
      return;
    }

    if (debouncedValue !== initialValue) {
      syncSearchParam(debouncedValue);
    }
  }, [debouncedValue, initialValue, syncSearchParam]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;

    setValue(nextValue);
  };

  return (
    <Input
      placeholder='Search'
      type='search'
      value={value}
      onChange={handleChange}
    />
  );
};
