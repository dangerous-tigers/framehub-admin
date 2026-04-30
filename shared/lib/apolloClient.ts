import { getAuthCookie } from '@/shared/lib/getAuthCookie';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  uri: 'https://inctagram.work/api/v1/graphql',
});

const authMiddleware = new SetContextLink(async ({ headers }) => {
  const cookies = await getAuthCookie();

  return {
    headers: {
      ...headers,
      authorization: `Basic ${cookies}`,
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authMiddleware.concat(httpLink),
  cache: new InMemoryCache(),
});
