'use client';

import { Select } from '@dangerous-tigers/framehub-ui-kit/components';

import { SortPreset } from '../model/useSortUsers';

import styles from './SortDropdown.module.scss';

interface SortDropdownProps {
  value: SortPreset;
  onChange: (preset: SortPreset) => void;
}

const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'date-desc', label: 'Date: Newest first' },
  { value: 'date-asc', label: 'Date: Oldest first' },
];

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className={styles.container}>
      <span className={styles.label}>Sort by:</span>
      <Select
        value={value}
        onValueChange={(newValue: string) => onChange(newValue as SortPreset)}
        options={SORT_OPTIONS}
        variant='default'
        width='210px'
        disabled={false}
      />
    </div>
  );
}
