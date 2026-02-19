import * as Types from '../types/__generated__/graphql';

export type GetUserQueryVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
}>;


export type GetUserQuery = { getUser: { __typename: 'User', id: number } };
