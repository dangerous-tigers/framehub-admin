import { gql } from "@apollo/client";

export { GetUsersQuery, GetUsersQueryVariables } from "./getUsers.generated";

export const GET_USERS = gql`
  query GetUsers(
    $pageNumber: Int
    $pageSize: Int
    $searchTerm: String
    $sortBy: String
    $sortDirection: SortDirection
    $statusFilter: UserBlockStatus
  ) {
    getUsers(
      pageNumber: $pageNumber
      pageSize: $pageSize
      searchTerm: $searchTerm
      sortBy: $sortBy
      sortDirection: $sortDirection
      statusFilter: $statusFilter
    ) {
      pagination {
        page
        pageSize
        pagesCount
        totalCount
      }
      users {
        id
        userName
        email
        createdAt
        profile {
          firstName
          lastName
          avatars {
            url
          }
        }
        userBan {
          reason
          createdAt
        }
      }
    }
  }
`;
