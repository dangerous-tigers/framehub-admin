import * as Types from '../generated/graphql';

export type BanUserMutationVariables = Types.Exact<{
  banReason: Types.Scalars['String']['input'];
  userId: Types.Scalars['Int']['input'];
}>;


export type BanUserMutation = { banUser: boolean };
