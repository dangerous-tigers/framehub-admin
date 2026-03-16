'use client';

import { type ReactNode, useState } from 'react';
import clsx from 'clsx';

import { LOGIN_ADMIN } from '@/queries/login';
import { type LoginAdminMutation } from '@/queries/login.generated';
import { Sidebar } from '@/widgets/sidebar';
import { useMutation } from '@apollo/client/react';

export function AppShell({ children }: { children: ReactNode }) {
  const [loginMutation] = useMutation<LoginAdminMutation>(LOGIN_ADMIN, {
    variables: { email: 'admin@gmail.com', password: 'admin' },
  });
  const [isAuth, setIsAuth] = useState(false);

  const handleLogin = async () => {
    const { data } = await loginMutation({});

    if (data?.loginAdmin.logged) {
      setIsAuth(true);
    }
  };

  return (
    <div className='mainBox'>
      <main className='main'>
        <div className={clsx({ ['mainBoxBody']: isAuth })}>
          <button onClick={handleLogin}>LOGIN</button>
          {isAuth && <Sidebar />}
          {children}
        </div>
      </main>
    </div>
  );
}
