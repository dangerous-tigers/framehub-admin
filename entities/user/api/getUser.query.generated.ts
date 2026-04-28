import * as Types from '../../../generated/graphql';

export type GetUserQueryVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
}>;


export type GetUserQuery = { getUser: { __typename: 'User', id: number, userName: string, email: string, createdAt: string, profile: { __typename: 'Profile', avatars: Array<{ __typename: 'Avatar', url: string | null }> | null } } };
