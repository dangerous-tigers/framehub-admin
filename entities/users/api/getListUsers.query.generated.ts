import * as Types from '../../../generated/graphql';

export type GetListUsersQueryVariables = Types.Exact<{
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  pageNumber?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>;
  sortDirection?: Types.InputMaybe<Types.SortDirection>;
  searchTerm?: Types.InputMaybe<Types.Scalars['String']['input']>;
  statusFilter?: Types.InputMaybe<Types.UserBlockStatus>;
}>;


export type GetListUsersQuery = { getUsers: { __typename: 'UsersPaginationModel', users: Array<{ __typename: 'User', id: number, userName: string, email: string, createdAt: string, userBan: { __typename: 'UserBan', reason: string, createdAt: string } | null }>, pagination: { __typename: 'PaginationModel', totalCount: number, page: number, pageSize: number, pagesCount: number } } };
