import { gql } from "@apollo/client";

export const GET_POST_BY_USER = gql`
  query getPostsByUser($userId: Int!, $endCursorId: Int) {
    getPostsByUser(userId: $userId, endCursorId: $endCursorId) {
      pageSize
      pagesCount
      totalCount
      items {
        id
        url
      }
    }
  }
`;
