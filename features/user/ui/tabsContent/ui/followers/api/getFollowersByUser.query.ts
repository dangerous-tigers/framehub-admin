import { gql } from '@apollo/client';

export const GET_FOLLOWERS_BY_USER = gql`
  query getFoolowers(
    $userId: Int!
    $pageSize: Int!
    $pageNumber: Int!
    $sortBy: String
    $sortDirection: SortDirection
  ) {
    getFollowers(
      userId: $userId
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      page
      pageSize
      pagesCount
      totalCount
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
