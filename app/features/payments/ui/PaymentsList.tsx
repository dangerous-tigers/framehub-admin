"use client";

import { GET_PAYMENTS } from "@/queries/payments";
import { GetPaymentsQuery } from "@/queries/payments.generated";
import { useQuery } from "@apollo/client/react";

export const PaymentsList = () => {
  const { data } = useQuery<GetPaymentsQuery>(GET_PAYMENTS, {
    variables: {
      pageSize: 10,
      pageNumber: 1,
      sortBy: "createdAt",
    },
  });
  console.log(data);

  if (!data?.getPayments.items.length) {
    return <div>Платежей не было</div>;
  }

  return <div>Payments</div>;
};
