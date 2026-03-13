"use client";

import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { apolloClient } from "shared/lib/apolloClient";

import { ApolloProvider } from "@apollo/client/react";

export const AppProviders = ({
  children,
  locale,
  messages,
}: {
  children: ReactNode;
  locale: string;
  messages: Record<string, unknown>;
}) => {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
    </NextIntlClientProvider>
  );
};
