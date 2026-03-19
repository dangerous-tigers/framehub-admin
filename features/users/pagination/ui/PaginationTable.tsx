import { useSearchParamWithKey } from '@/entities/users/model/searchParams/useSearchParamWithKey';
import { Pagination } from '@dangerous-tigers/framehub-ui-kit/components';

type PaginationTableProps = {
  page: number | undefined;
  pageSize: number | undefined;
  pageTotal: number | undefined;
};

export const PaginationTable = (props: PaginationTableProps) => {
  const { initialValue: page, syncSearchParam: syncSearchParamPage } = useSearchParamWithKey({
    key: 'p',
  });
  const { initialValue: pageSize, syncSearchParam: syncSearchParamPageSize } = useSearchParamWithKey({
    key: 'ps',
  });

  if (props.page === undefined || props.pageTotal === 0) {
    return null;
  }

  return (
    <Pagination
      currentPage={Number(page) || props.page}
      pageSize={pageSize || String(props.pageSize)}
      totalPages={props.pageTotal || 0}
      onPageChange={(page) => syncSearchParamPage(`${page}`)}
      onPageSizeChange={(size) => syncSearchParamPageSize(`${size}`)}
    />
  );
};
