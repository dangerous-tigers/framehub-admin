import { useState } from 'react';

import { QueryGetPaymentsByUserArgs } from '@/types/__generated__/graphql';
import { useQuery } from '@apollo/client/react';

import { GET_PAYMENTS_BY_USER } from '../api/getPaymentsByUser.query';

import { GetPaymentsByUser } from './types';

export const useQueryGetPaymentsByUser = ({ userId }: { userId: number }) => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const onPageSizeChange = (value: string) => {
    const parsedPageSize = Number(value);

    if (Number.isNaN(parsedPageSize)) return;

    setPageSize(parsedPageSize);
    setCurrentPage(1);
  };

  const { data, loading } = useQuery<
    {
      getPaymentsByUser: GetPaymentsByUser;
    },
    QueryGetPaymentsByUserArgs
  >(GET_PAYMENTS_BY_USER, {
    variables: {
      userId: userId,
      pageSize: pageSize,
      pageNumber: currentPage,
    },
  });

  return {
    data,
    loading,
    pageSize,
    onPageSizeChange,
    currentPage,
    setCurrentPage,
  };
};
