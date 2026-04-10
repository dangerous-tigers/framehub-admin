import { gql } from '@apollo/client';

export const REMOVE_USER = gql`
  mutation remove($userId: Int!) {
    removeUser(userId: $userId)
  }
`;
