import * as Types from '../../../generated/graphql';

export type BanMutationVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
  banReason: Types.Scalars['String']['input'];
}>;


export type BanMutation = { banUser: boolean };
