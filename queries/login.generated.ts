import * as Types from "@/types/__generated__/graphql";

export type LoginAdminMutationVariables = Types.Exact<{
  email: Types.Scalars["String"]["input"];
  password: Types.Scalars["String"]["input"];
}>;

export type LoginAdminMutation = {
  loginAdmin: { __typename: "LoginAdmin"; logged: boolean };
};
