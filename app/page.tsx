'use client';

import { type ReactNode } from 'react';

import styles from './page.module.css';

export default function Home({ children }: { children: ReactNode }) {
  return (
    <div className={styles.page}>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
