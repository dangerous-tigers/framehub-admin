import { gql } from '@apollo/client';

export const GET_USER = gql`
  query getUser($userId: Int!) {
    getUser(userId: $userId) {
      id
      userName
      email
      profile {
        avatars {
          url
        }
      }
      createdAt
    }
  }
`;
