import * as Types from '../generated/graphql';

export type GetPostsQueryVariables = Types.Exact<{
  endCursorPostId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  searchTerm?: Types.InputMaybe<Types.Scalars['String']['input']>;
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>;
  sortDirection?: Types.InputMaybe<Types.SortDirection>;
}>;


export type GetPostsQuery = { getPosts: { __typename: 'PostsPaginationModel', pagesCount: number, pageSize: number, totalCount: number, items: Array<{ __typename: 'Post', id: number, ownerId: number, description: string, createdAt: string, updatedAt: string, images: Array<{ __typename: 'ImagePost', id: number | null, createdAt: string | null, url: string | null, width: number | null, height: number | null, fileSize: number | null }> | null, postOwner: { __typename: 'PostOwnerModel', id: number, userName: string, firstName: string | null, lastName: string | null, avatars: Array<{ __typename: 'Avatar', url: string | null, width: number | null, height: number | null, fileSize: number | null }> | null }, userBan: { __typename: 'UserBan', reason: string, createdAt: string } | null }> } };
