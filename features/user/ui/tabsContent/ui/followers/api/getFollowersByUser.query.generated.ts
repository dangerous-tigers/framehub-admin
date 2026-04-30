import * as Types from '../../../../../../../generated/graphql';

export type GetFoolowersQueryVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
  pageSize: Types.Scalars['Int']['input'];
  pageNumber: Types.Scalars['Int']['input'];
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>;
  sortDirection?: Types.InputMaybe<Types.SortDirection>;
}>;


export type GetFoolowersQuery = { getFollowers: { __typename: 'FollowPaginationModel', page: number, pageSize: number, pagesCount: number, totalCount: number, items: Array<{ __typename: 'Follow', userId: number, userName: string | null, firstName: string | null, lastName: string | null, createdAt: string }> } };
