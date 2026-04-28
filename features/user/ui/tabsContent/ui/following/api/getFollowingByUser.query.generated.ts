import * as Types from '../../../../../../../generated/graphql';

export type GetFollowingQueryVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
  pageSize: Types.Scalars['Int']['input'];
  pageNumber: Types.Scalars['Int']['input'];
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>;
  sortDirection?: Types.InputMaybe<Types.SortDirection>;
}>;


export type GetFollowingQuery = { getFollowing: { __typename: 'FollowPaginationModel', page: number, pageSize: number, totalCount: number, pagesCount: number, items: Array<{ __typename: 'Follow', userId: number, userName: string | null, firstName: string | null, lastName: string | null, createdAt: string }> } };
