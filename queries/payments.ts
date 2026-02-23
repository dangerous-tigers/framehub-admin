import { gql, TypedDocumentNode } from "@apollo/client";

import {
  GetPaymentsQuery,
  GetPaymentsQueryVariables,
} from "./payments.generated";

export const GET_PAYMENTS: TypedDocumentNode<
  GetPaymentsQuery,
  GetPaymentsQueryVariables
> = gql`
  query getPayments(
    $pageSize: Int!
    $pageNumber: Int!
    $sortBy: String!
    $sortDirection: SortDirection
    $searchTerm: String
  ) {
    getPayments(
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
      searchTerm: $searchTerm
    ) {
      pagesCount
      page
      pageSize
      totalCount
      items {
        id
        userName
        amount
        currency
        createdAt
        type
        paymentMethod
        avatars {
          url
        }
      }
    }
  }
`;
