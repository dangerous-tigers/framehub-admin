'use client';

import { FilterStatus } from '@/features/users/filterStatus/ui/FilterStatus';
import { SearchComponent } from '@/features/users/Search/ui/SearchComponent';

import s from './Search.module.scss';

export const Search = () => {
  return (
    <div className={s.root}>
      <SearchComponent />
      <FilterStatus />
    </div>
  );
};
