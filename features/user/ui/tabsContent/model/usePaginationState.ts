import { useState } from 'react';

export function usePaginationState() {
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const onPageSizeChange = (value: string) => {
    const parsedPageSize = Number(value);

    if (Number.isNaN(parsedPageSize)) return;

    setPageSize(parsedPageSize);
    setCurrentPage(1);
  };

  return {
    pageSize,
    currentPage,
    onPageSizeChange,
    setCurrentPage,
  };
}
