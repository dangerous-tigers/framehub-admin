"use client";
import { ReactNode } from "react";
import { apolloClient } from "shared/lib/apolloClient";

import { ApolloProvider } from "@apollo/client/react";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
