'use client';

import { type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import { Sidebar } from '@/widgets/sidebar';

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isUserDetailsPage = /^\/users\/[^/]+$/.test(pathname);

  return (
    <div className='mainBox'>
      <main className='main'>
        <div className={clsx({ ['mainBoxBody']: !isUserDetailsPage })}>
          {!isUserDetailsPage && <Sidebar />}
          {children}
        </div>
      </main>
    </div>
  );
}
