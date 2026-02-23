"use client";

import { ChangeEvent, useEffect, useState } from "react";

import { SORT_BY, SortBy } from "@/app/features/payments/model/types";
import {
  Avatar,
  CurrencyType,
  PaymentMethod,
  SortDirection,
  SubscriptionType,
} from "@/generated/graphql";
import { GET_PAYMENTS } from "@/queries/payments";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { formatDate } from "@/shared/lib/formatDate";
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
  sortDirection,
  sortBy,
}: {
  currentPage: number;
  pageSize: number;
  searchTerm: string;
  sortDirection: SortDirection;
  sortBy: SortBy;
}) => {
  const { data, fetchMore, refetch } = useQuery(GET_PAYMENTS, {
    variables: {
      pageSize: pageSize,
      pageNumber: currentPage,
      sortBy: sortBy,
      sortDirection: sortDirection,
      searchTerm: searchTerm,
    },
  });
  return {
    items: data?.getPayments.items,
    totalCount: data?.getPayments.totalCount,
    fetchMore,
    refetch,
  };
};
export const PaymentsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState("10");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortBy>(SORT_BY.CREATED_AT);

  const { items, totalCount, fetchMore, refetch } = usePaginationQuery({
    pageSize: Number(pageSize),
    currentPage,
    searchTerm: search,
    sortDirection: SortDirection.Desc,
    sortBy: sort,
  });

  useDebounce(
    () => {
      refetch();
    },
    1000,
    [search],
  );

  useEffect(() => {
    refetch();
  }, [sort, pageSize]);

  const totalPages = Math.ceil(totalCount! / +pageSize);

  const handlePageSizeChange = (value: string) => {
    setPageSize(value);
    setCurrentPage(1);
  };
  const onPageChangeHandler = (page: number) => {
    setCurrentPage(page);
    fetchMore({ variables: { pageNumber: page } });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const handleDateSort = () => {
    setSort(SORT_BY.CREATED_AT);
  };
  const handleUserNameSort = () => {
    setSort(SORT_BY.USER_NAME);
  };
  const handleAmountSort = () => {
    setSort(SORT_BY.AMOUNT);
  };
  const handlePaymentSort = () => {
    setSort(SORT_BY.PAYMENT_METHOD);
  };

  // if (loading) return <Catpreloader />;

  // if (isError) return <div>Ошибка загрузки платежей</div>;

  return (
    <div className={s.main}>
      <Input type={"search"} value={search} onChange={handleSearch} />
      {!items?.length ? (
        <div className={s.nothing}>Nothing . . .</div>
      ) : (
        <>
          <div className={s.title}>
            <div onClick={handleUserNameSort}>Username</div>
            <div onClick={handleDateSort}>Date of Payment</div>
            <div onClick={handleAmountSort}>Amount, $</div>
            <div>Subscription</div>
            <div onClick={handlePaymentSort}>Payment Method</div>
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
              const currency = (
                type: CurrencyType | null = payment.currency,
              ) => {
                switch (type) {
                  case "EUR":
                    return "€";
                  default:
                    return "$";
                }
              };
              const getAvatarPath = (
                paymentAvatars: Avatar[] | null,
              ): string | undefined => {
                if (paymentAvatars && paymentAvatars[0]?.url)
                  return paymentAvatars[0].url;
                return undefined;
              };
              const createdAt = (
                createdAt: string | null,
              ): string | undefined => {
                if (createdAt) return createdAt;
                return undefined;
              };
              return (
                <div key={payment.id} className={s.item}>
                  <div className={s.userName}>
                    <img
                      style={{ width: "36px", borderRadius: "50%" }}
                      src={getAvatarPath(payment.avatars)}
                      alt="avatar image"
                    />
                    {payment.userName}
                  </div>
                  <div>{formatDate(createdAt(payment.createdAt))}</div>
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
        </>
      )}
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
