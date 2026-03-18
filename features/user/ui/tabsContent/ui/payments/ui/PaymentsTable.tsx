import { formatDate, normalizeSubsriptionType } from '@/shared/lib';
import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@dangerous-tigers/framehub-ui-kit/components';

import { NoTableContent } from '../../NoTableContent';
import { BusinessAccountSubscription, GetPaymentsByUser } from '../model/types';

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
    return <NoTableContent />;
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
                    <Skeleton style={{ width: '150px', height: '22px' }} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          : payments?.items?.map((payment: BusinessAccountSubscription) => (
              <TableRow key={payment.id}>
                <TableCell>{formatDate(payment.dateOfPayment)}</TableCell>
                <TableCell>{formatDate(payment.endDate)}</TableCell>
                <TableCell>$ {payment.price}</TableCell>
                <TableCell>{normalizeSubsriptionType(payment.type)}</TableCell>
                <TableCell>{payment.paymentType}</TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
}
