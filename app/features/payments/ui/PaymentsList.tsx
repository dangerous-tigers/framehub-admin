"use client";

import { useState } from "react";

import { GET_PAYMENTS } from "@/queries/payments";
import {
  GetPaymentsQuery,
  GetPaymentsQueryVariables,
} from "@/queries/payments.generated";
import { formatDate } from "@/shared/lib/formatDate";
import {
  CurrencyType,
  PaymentMethod,
  SubscriptionType,
} from "@/types/__generated__/graphql";
import { useQuery } from "@apollo/client/react";
import {
  Input,
  Pagination,
} from "@dangerous-tigers/framehub-ui-kit/components";

import s from "./PaymentsList.module.scss";

import "@dangerous-tigers/framehub-ui-kit/components/styles";

export const usePaginationQuery = ({
  currentPage,
  pageSize,
  searchTerm,
}: {
  currentPage: number;
  pageSize: number;
  searchTerm: string;
}) => {
  const { data, fetchMore } = useQuery<
    GetPaymentsQuery,
    GetPaymentsQueryVariables
  >(GET_PAYMENTS, {
    variables: {
      pageSize: pageSize,
      pageNumber: currentPage,
      sortBy: "createdAt",
      searchTerm: searchTerm,
    },
  });
  return {
    items: data?.getPayments.items,
    totalCount: data?.getPayments.totalCount,
    fetchMore,
  };
};
export const PaymentsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState("6");

  const { items, totalCount, fetchMore } = usePaginationQuery({
    pageSize: Number(pageSize),
    currentPage,
    searchTerm: "",
  });
  console.log(items);

  if (!items?.length) {
    return <div>Платежей не было</div>;
  }

  const totalPages = Math.ceil(totalCount! / +pageSize);

  // const paginatedPayments = items.slice(
  //   (currentPage - 1) * +pageSize,
  //   currentPage * +pageSize,
  // );

  const handlePageSizeChange = (value: string) => {
    setPageSize(value);
    setCurrentPage(1);
  };
  const onPageChangeHandler = (page: number) => {
    setCurrentPage(page);
    fetchMore({ variables: { pageNumber: page } });
  };

  // if (loading) return <Catpreloader />;

  // if (isError) return <div>Ошибка загрузки платежей</div>;

  return (
    <div className={s.main}>
      <Input type={"search"} />
      <div className={s.title}>
        <div>Username</div>
        <div>Date of Payment</div>
        <div>Amount, $</div>
        <div>Subscription</div>
        <div>Payment Method</div>
      </div>
      <div className={s.body}>
        {items.map((payment) => {
          if (!payment) return null;
          const formatType = (type: SubscriptionType = payment.type) => {
            switch (type) {
              case "DAY":
                return "1 day";
              case "WEEKLY":
                return "7 days";
              default:
                return "1 month";
            }
          };
          const paymentMethod = (
            type: PaymentMethod = payment.paymentMethod,
          ) => {
            switch (type) {
              case "CREDIT_CARD":
                return "Credit Card";
              case "PAYPAL":
                return "PayPal";
              default:
                return "Stripe";
            }
          };
          const currency = (type: CurrencyType = payment.currency) => {
            switch (type) {
              case "EUR":
                return "€";
              default:
                return "$";
            }
          };

          return (
            <div key={payment.id} className={s.item}>
              <div className={s.userName}>
                <img
                  style={{ width: "36px", borderRadius: "50%" }}
                  src={payment.avatars && payment.avatars[0]?.url}
                  alt="avatar image"
                />
                {payment.userName}
              </div>
              <div>{formatDate(payment.createdAt)}</div>
              <div>
                <span>{payment.amount} </span>
                <span>{currency()}</span>
              </div>
              <div>{formatType()}</div>
              <div>{paymentMethod()}</div>
            </div>
          );
        })}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChangeHandler}
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
        className={s.pagination}
      />
    </div>
  );
};
