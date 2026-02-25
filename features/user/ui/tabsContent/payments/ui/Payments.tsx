import { Pagination } from "@dangerous-tigers/framehub-ui-kit/components";

import { PAYMENTS_TABLE_HEADERS, useQueryGetPaymentsByUser } from "../model";

import { PaymentsTable } from "./PaymentsTable";

import s from "./Payments.module.scss";

export function Payment({ userId }: { userId: number }) {
  const {
    data,
    loading,
    pageSize,
    onPageSizeChange,
    currentPage,
    setCurrentPage,
  } = useQueryGetPaymentsByUser({ userId });

  return (
    <div className={s.root}>
      <PaymentsTable
        className={s.table}
        column={PAYMENTS_TABLE_HEADERS}
        payments={data?.getPaymentsByUser}
        loading={loading}
        pageSize={pageSize}
      />
      <Pagination
        totalPages={data?.getPaymentsByUser.pagesCount ?? 0}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        pageSize={pageSize.toString()}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
}
