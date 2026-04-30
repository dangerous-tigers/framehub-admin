import { useState } from 'react';

export function useTableSort(setCurrentPage: (number: number) => void) {
  const [sortBy, setSortBy] = useState<{
    field: 'createdAt' | 'userName';
    direction: 'asc' | 'desc';
  }>({
    field: 'createdAt',
    direction: 'asc',
  });

  const setCurrentPageAndSortBy = (field: 'createdAt' | 'userName', direction: 'asc' | 'desc') => {
    setCurrentPage(1);
    setSortBy({ field, direction });
  };
  return {
    sortBy,
    setCurrentPageAndSortBy,
  };
}
