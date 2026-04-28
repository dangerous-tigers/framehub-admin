import * as Types from '../../../../../../../generated/graphql';

export type GetPaymentsByUserQueryVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
  pageSize: Types.Scalars['Int']['input'];
  pageNumber: Types.Scalars['Int']['input'];
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>;
  sortDirection?: Types.InputMaybe<Types.SortDirection>;
}>;


export type GetPaymentsByUserQuery = { getPaymentsByUser: { __typename: 'PaymentPaginationModel', pagesCount: number, page: number, pageSize: number, totalCount: number, items: Array<{ __typename: 'SubscriptionByPaymentModel', id: string, businessAccountId: number, status: Types.StatusSubscriptionType, dateOfPayment: string | null, startDate: string | null, endDate: string | null, type: Types.SubscriptionType, price: number, paymentType: Types.PaymentMethod | null, payments: Array<{ __typename: 'Payment', amount: number | null, type: Types.SubscriptionType | null }> }> } };
