import * as Types from '../generated/graphql';

export type UnbanUserMutationVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
}>;


export type UnbanUserMutation = { unbanUser: boolean };
