import { gql, TypedDocumentNode } from '@apollo/client';

import { UnbanUserMutation, UnbanUserMutationVariables } from './unbanUser.generated';

export const USER_UNBAN: TypedDocumentNode<UnbanUserMutation, UnbanUserMutationVariables> = gql`
  mutation unbanUser($userId: Int!) {
    unbanUser(userId: $userId)
  }
`;
