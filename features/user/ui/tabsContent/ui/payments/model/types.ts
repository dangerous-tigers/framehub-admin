export type GetPaymentsByUser = {
  items: BusinessAccountSubscription[];
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
};
export type BusinessAccountSubscription = {
  businessAccountId: number;
  dateOfPayment: string;
  endDate: string;
  startDate: string;
  id: string;

  paymentType: "PAYPAL" | "STRIPE" | "CREDIT_CARD";
  status: "ACTIVE" | "EXPIRED" | "CANCELED";
  type: "WEEKLY" | "MONTHLY" | "DAY";

  price: number;

  payments: {
    amount: number;
    type: "PAYPAL" | "STRIPE" | "CREDIT_CARD";
    __typename: "Payment";
  }[];
};
