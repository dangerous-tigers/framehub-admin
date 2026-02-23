import * as Types from "../generated/graphql";

export type GetPaymentsQueryVariables = Types.Exact<{
  pageSize: Types.Scalars["Int"]["input"];
  pageNumber: Types.Scalars["Int"]["input"];
  sortBy: Types.Scalars["String"]["input"];
  sortDirection?: Types.InputMaybe<Types.SortDirection>;
  searchTerm?: Types.InputMaybe<Types.Scalars["String"]["input"]>;
}>;

export type GetPaymentsQuery = {
  getPayments: {
    __typename: "PaymentsPaginationModel";
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: Array<{
      __typename: "SubscriptionPaymentsModel";
      id: number | null;
      userName: string;
      amount: number | null;
      currency: Types.CurrencyType | null;
      createdAt: string | null;
      type: Types.SubscriptionType;
      paymentMethod: Types.PaymentMethod;
      avatars: Array<{ __typename: "Avatar"; url: string | null }> | null;
    }>;
  };
};
