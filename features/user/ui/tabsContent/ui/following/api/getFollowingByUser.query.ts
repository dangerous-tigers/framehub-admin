import { gql } from "@apollo/client";

export const GET_FOLLOWING_BY_USER = gql`
  query getFollowing(
    $userId: Int!
    $pageSize: Int!
    $pageNumber: Int!
    $sortBy: String
    $sortDirection: SortDirection
  ) {
    getFollowing(
      userId: $userId
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      page
      pageSize
      totalCount
      pagesCount
      items {
        userId
        userName
        firstName
        lastName
        createdAt
      }
    }
  }
`;
