"use client";

import { apolloClient } from "shared/lib/apolloClient";

import { ApolloProvider } from "@apollo/client/react";

import styles from "./page.module.css";

import { Example } from "Example";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ApolloProvider client={apolloClient}>
          <Example />
        </ApolloProvider>
      </main>
    </div>
  );
}
