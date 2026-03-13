import { gql } from "@apollo/client";

// Types will be generated after running: pnpm codegen
// export { GetMeQuery } from "./getMe.generated";

export const GET_ME = gql`
  query GetMe {
    me {
      id
      email
      userName
      role
    }
  }
`;
