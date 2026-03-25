import { gql } from '@apollo/client';

export type { LoginAdminMutation, LoginAdminMutationVariables } from './login.generated';

export const LOGIN_ADMIN = gql`
  mutation loginAdmin($email: String!, $password: String!) {
    loginAdmin(email: $email, password: $password) {
      logged
    }
  }
`;
