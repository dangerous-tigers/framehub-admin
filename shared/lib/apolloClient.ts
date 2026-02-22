import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: "https://inctagram.work/api/v1/graphql",
});

const authMiddleware = new SetContextLink(({ headers }) => {
  return {
    headers: {
      ...headers,
      authorization: "Basic YWRtaW5AZ21haWwuY29tOmFkbWlu",
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authMiddleware.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getPayments: {
            keyArgs: ["payments"],
          },
        },
      },
    },
  }),
});
