import { BanUserMutation, BanUserMutationVariables } from '@/queries/banUser.generated';
import { gql, TypedDocumentNode } from '@apollo/client';

export const USER_BAN: TypedDocumentNode<BanUserMutation, BanUserMutationVariables> = gql`
  mutation banUser($banReason: String!, $userId: Int!) {
    banUser(banReason: $banReason, userId: $userId)
  }
`;
