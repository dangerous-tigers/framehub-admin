import { gql } from "@apollo/client";

export const GET_PAYMENTS = gql`
  query getPayments(
    $pageSize: Int!
    $pageNumber: Int!
    $sortBy: String!
    $sortDirection: SortDirection
  ) {
    getPayments(
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
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
        paymentMethod
      }
    }
  }
`;
