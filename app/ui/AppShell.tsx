'use client';

import { type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import { Sidebar } from '@/widgets/sidebar';

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isUserDetailsPage = /^\/users\/[^/]+$/.test(pathname);

  // const [loginMutation] = useMutation<LoginAdminMutation>(LOGIN_ADMIN, {
  //   variables: { email: 'admin@gmail.com', password: 'admin' },
  // });
  //const [isAuth] = useState(true);

  // const handleLogin = async () => {
  //   const { data } = await loginMutation({});

  //   if (data?.loginAdmin.logged) {
  //     setIsAuth(true);
  //   }
  // };

  return (
    <div className='mainBox'>
      <main className='main'>
        <div className={clsx({ ['mainBoxBody']: !isUserDetailsPage })}>
          {/* {isAuth && <Sidebar />} */}
          {!isUserDetailsPage && <Sidebar />}
          {children}
        </div>
      </main>
    </div>
  );
}
