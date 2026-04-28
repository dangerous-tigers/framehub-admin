import * as Types from '../../../../../../../generated/graphql';

export type GetPostsByUserQueryVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
  endCursorId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetPostsByUserQuery = { getPostsByUser: { __typename: 'PostsByUserModel', pageSize: number, pagesCount: number, totalCount: number, items: Array<{ __typename: 'ImagePost', id: number | null, url: string | null }> | null } };
