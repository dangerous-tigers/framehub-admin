"use client";

import { ChangeEvent, useState } from "react";
import clsx from "clsx";

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
  Button,
  Input,
  Pagination,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
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
  const { data, loading, refetch } = useQuery(GET_PAYMENTS, {
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
    refetch,
    loading,
  };
};

export type Columns =
  | "Username"
  | "Date of Payment"
  | "Amount, $"
  | "Subscription"
  | "Payment Method";

export type TableColumn = {
  column: Columns;
  sort?: SortBy;
  direction?: SortDirection;
  filterHandler?: () => void;
};

export const PaymentsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState("6");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortBy>(SORT_BY.CREATED_AT);
  const [direction, setDirection] = useState<SortDirection>(SortDirection.Desc);

  const { items, totalCount, refetch, loading } = usePaginationQuery({
    pageSize: Number(pageSize),
    currentPage,
    searchTerm: search,
    sortDirection: direction,
    sortBy: sort,
  });

  useDebounce(
    () => {
      refetch();
    },
    1000,
    [search],
  );

  const totalPages = Math.ceil(totalCount! / +pageSize);

  const handlePageSizeChange = (value: string) => {
    setPageSize(value);
    setCurrentPage(1);
  };
  const onPageChangeHandler = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const handleDateSort = (dir: SortDirection) => {
    if (sort !== SORT_BY.CREATED_AT) {
      setSort(SORT_BY.CREATED_AT);
      setDirection(direction === dir ? SortDirection.Desc : SortDirection.Asc);
    } else if (sort === SORT_BY.CREATED_AT && direction === SortDirection.Asc) {
      setDirection(SortDirection.Desc);
    } else {
      setSort(SORT_BY.CREATED_AT);
      setDirection(SortDirection.Asc);
    }
  };
  const handleUserNameSort = (dir: SortDirection) => {
    if (sort !== SORT_BY.USER_NAME) {
      setSort(SORT_BY.USER_NAME);
      setDirection(direction === dir ? SortDirection.Desc : SortDirection.Asc);
    } else if (sort === SORT_BY.USER_NAME && direction === SortDirection.Asc) {
      setDirection(SortDirection.Desc);
    } else {
      setSort(SORT_BY.USER_NAME);
      setDirection(SortDirection.Asc);
    }
  };

  const handleAmountSort = (dir: SortDirection) => {
    if (sort !== SORT_BY.AMOUNT) {
      setSort(SORT_BY.AMOUNT);
      setDirection(dir === direction ? SortDirection.Desc : SortDirection.Asc);
    } else if (sort === SORT_BY.AMOUNT && direction === SortDirection.Asc) {
      setDirection(SortDirection.Desc);
    } else {
      setSort(SORT_BY.AMOUNT);
      setDirection(SortDirection.Asc);
    }
  };

  const handlePaymentSort = (dir: SortDirection) => {
    if (sort !== SORT_BY.PAYMENT_METHOD) {
      setSort(SORT_BY.PAYMENT_METHOD);
      setDirection(direction === dir ? SortDirection.Desc : SortDirection.Asc);
    } else if (
      sort === SORT_BY.PAYMENT_METHOD &&
      direction === SortDirection.Asc
    ) {
      setDirection(SortDirection.Desc);
    } else {
      setSort(SORT_BY.PAYMENT_METHOD);
      setDirection(SortDirection.Asc);
    }
  };

  const tableHeadItems: TableColumn[] = [
    {
      column: "Username",
      sort: SORT_BY.USER_NAME,
      direction: SortDirection.Desc,
      filterHandler: () => handleUserNameSort(direction),
    },
    {
      column: "Date of Payment",
      sort: SORT_BY.CREATED_AT,
      direction: SortDirection.Desc,
      filterHandler: () => handleDateSort(direction),
    },
    {
      column: "Amount, $",
      sort: SORT_BY.AMOUNT,
      direction: SortDirection.Desc,
      filterHandler: () => handleAmountSort(direction),
    },
    { column: "Subscription", filterHandler: () => {} },
    {
      column: "Payment Method",
      sort: SORT_BY.PAYMENT_METHOD,
      direction: SortDirection.Desc,
      filterHandler: () => handlePaymentSort(direction),
    },
  ];

  return (
    <div className={s.main}>
      <Input type="search" onChange={handleSearch} />
      <Table>
        <TableHeader>
          <TableRow>
            {tableHeadItems.map((col) => (
              <TableHead key={col.column}>
                <div className={s.headColumn}>
                  <span>{col.column}</span>
                  <Button
                    className={clsx([
                      direction === SortDirection.Asc &&
                        sort === col.sort &&
                        s.asc,
                      direction === SortDirection.Desc &&
                        sort === col.sort &&
                        s.desc,
                    ])}
                    onClick={col.filterHandler}
                    variant="text"
                  >
                    <svg
                      width="8"
                      height="12"
                      viewBox="0 0 8 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        id="arrowUp"
                        d="M4 0L7.4641 4.5H0.535898L4 0Z"
                        fill="#4C4C4C"
                      />
                      <path
                        id="arrowDown"
                        d="M4 12L0.535898 7.5L7.4641 7.5L4 12Z"
                        fill="#4C4C4C"
                      />
                    </svg>
                  </Button>
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody style={{ textAlign: "center" }}>
          {loading
            ? [...Array(6)].map((_, index) => (
                <TableRow key={index}>
                  {[...Array(5)].map((_, index) => (
                    <TableCell key={index}>
                      <Skeleton style={{ width: "150px", height: "22px" }} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : items?.map((payment) => {
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
                  <TableRow key={payment.id}>
                    <TableCell>
                      <div className={s.userName}>
                        <img
                          style={{ width: "36px", borderRadius: "50%" }}
                          src={getAvatarPath(payment.avatars)}
                          alt="avatar image"
                        />
                        {payment.userName}
                      </div>
                    </TableCell>
                    <TableCell>
                      {formatDate(createdAt(payment.createdAt))}
                    </TableCell>
                    <TableCell>
                      <span>{payment.amount} </span>
                      <span>{currency()}</span>
                    </TableCell>
                    <TableCell>{formatType()}</TableCell>
                    <TableCell>{paymentMethod()}</TableCell>
                  </TableRow>
                );
              })}
        </TableBody>
      </Table>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChangeHandler}
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>

    // <div className={s.main}>
    //   <Input type={"search"} value={search} onChange={handleSearch} />
    //   {!items?.length ? (
    //     <div className={s.nothing}>Nothing . . .</div>
    //   ) : (
    //     <>
    //       <div className={s.title}>
    //         <div onClick={handleUserNameSort}>Username</div>
    //         <div onClick={handleDateSort}>Date of Payment</div>
    //         <div onClick={handleAmountSort}>Amount, $</div>
    //         <div>Subscription</div>
    //         <div onClick={handlePaymentSort}>Payment Method</div>
    //       </div>
    //       <div className={s.body}>
    //         {items.map((payment) => {
    // if (!payment) return null;
    // const formatType = (type: SubscriptionType = payment.type) => {
    //   switch (type) {
    //     case "DAY":
    //       return "1 day";
    //     case "WEEKLY":
    //       return "7 days";
    //     default:
    //       return "1 month";
    //   }
    // };
    // const paymentMethod = (
    //   type: PaymentMethod = payment.paymentMethod,
    // ) => {
    //   switch (type) {
    //     case "CREDIT_CARD":
    //       return "Credit Card";
    //     case "PAYPAL":
    //       return "PayPal";
    //     default:
    //       return "Stripe";
    //   }
    // };
    // const currency = (
    //   type: CurrencyType | null = payment.currency,
    // ) => {
    //   switch (type) {
    //     case "EUR":
    //       return "€";
    //     default:
    //       return "$";
    //   }
    // };
    // const getAvatarPath = (
    //   paymentAvatars: Avatar[] | null,
    // ): string | undefined => {
    //   if (paymentAvatars && paymentAvatars[0]?.url)
    //     return paymentAvatars[0].url;
    //   return undefined;
    // };
    // const createdAt = (
    //   createdAt: string | null,
    // ): string | undefined => {
    //   if (createdAt) return createdAt;
    //   return undefined;
    // };
    //           return (
    //             <div key={payment.id} className={s.item}>
    //               <div className={s.userName}>
    //                 <img
    //                   style={{ width: "36px", borderRadius: "50%" }}
    //                   src={getAvatarPath(payment.avatars)}
    //                   alt="avatar image"
    //                 />
    //                 {payment.userName}
    //               </div>
    //               <div>{formatDate(createdAt(payment.createdAt))}</div>
    //               <div>
    //                 <span>{payment.amount} </span>
    //                 <span>{currency()}</span>
    //               </div>
    //               <div>{formatType()}</div>
    //               <div>{paymentMethod()}</div>
    //             </div>
    //           );
    //         })}
    //       </div>
    //     </>
    //   )}
    //   <Pagination
    //     totalPages={totalPages}
    //     currentPage={currentPage}
    //     onPageChange={onPageChangeHandler}
    //     pageSize={pageSize}
    //     onPageSizeChange={handlePageSizeChange}
    //     className={s.pagination}
    //   />
    // </div>
  );
};
