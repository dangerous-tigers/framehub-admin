import { gql } from '@apollo/client';

export const GET_LIST_USERS = gql`
  query getListUsers(
    $pageSize: Int
    $pageNumber: Int
    $sortBy: String
    $sortDirection: SortDirection
    $searchTerm: String
    $statusFilter: UserBlockStatus
  ) {
    getUsers(
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
      searchTerm: $searchTerm
      statusFilter: $statusFilter
    ) {
      users {
        id
        userName
        email
        createdAt

        userBan {
          reason
          createdAt
        }
      }

      pagination {
        totalCount
        page
        pageSize
        pagesCount
      }
    }
  }
`;
