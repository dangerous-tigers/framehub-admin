import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@dangerous-tigers/framehub-ui-kit/components";

import { BusinessAccountSubscription, GetPaymentsByUser } from "../model/types";

import s from "./Payments.module.scss";

export function PaymentsTable({
  column,
  payments,
  loading,
  pageSize,
  className,
}: {
  column: string[];
  payments?: GetPaymentsByUser;
  loading: boolean;
  pageSize: number;
  className?: string;
}) {
  if (payments?.items?.length === 0) {
    return (
      <div>
        <p className={s.noContent}>No payments</p>
      </div>
    );
  }

  const SKELENON_COLUMN_COUNT = 5;

  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          {column.map((column: string) => (
            <TableHead key={column}>{column}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading
          ? [...Array(pageSize)].map((_, index) => (
              <TableRow key={index}>
                {[...Array(SKELENON_COLUMN_COUNT)].map((_, index) => (
                  <TableCell key={index}>
                    <Skeleton style={{ width: "150px", height: "22px" }} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          : payments?.items?.map((payment: BusinessAccountSubscription) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.dateOfPayment}</TableCell>
                <TableCell>{payment.endDate}</TableCell>
                <TableCell>{payment.price}</TableCell>
                <TableCell>{payment.type}</TableCell>
                <TableCell>{payment.paymentType}</TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
}
