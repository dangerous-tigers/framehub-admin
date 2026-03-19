export const SORT_BY = {
  CREATED_AT: 'createdAt',
  USER_NAME: 'userName',
  AMOUNT: 'amount',
  PAYMENT_METHOD: 'paymentMethod',
} as const;

export type SortBy = (typeof SORT_BY)[keyof typeof SORT_BY];
