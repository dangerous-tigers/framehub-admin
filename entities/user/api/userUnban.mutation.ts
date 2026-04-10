import { gql } from '@apollo/client';

export const UNBAN_USER = gql`
  mutation unban($userId: Int!) {
    unbanUser(userId: $userId)
  }
`;
