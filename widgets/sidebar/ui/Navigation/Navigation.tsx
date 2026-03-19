'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery';
import { NavigationItem } from '@/widgets/sidebar/model/navigation';
import { PolymorphicButton } from '@dangerous-tigers/framehub-ui-kit/components';
import { CreditCardOutline, Image, Person, TrendingUp } from '@dangerous-tigers/framehub-ui-kit/icons';

import s from './navigation.module.scss';

type PropsNavigation = {
  className?: string;
};

export const Navigation = ({ className }: PropsNavigation) => {
  const pathname = usePathname();

  const navigationItems: NavigationItem[] = [
    { href: 'users', label: 'User List', Component: Person },
    { href: 'statistics', label: 'Statistics', Component: TrendingUp },
    { href: 'payments', label: 'Payments list', Component: CreditCardOutline },
    { href: 'posts', label: 'Posts list', Component: Image },
    //{ href: routes.empty, label: 'logOut', Component: LogOut },
  ];

  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className={clsx(s.navigation, className)}>
      <>
        {navigationItems.map((item) => {
          const { href, Component, label, as = Link } = item;

          return (
            <PolymorphicButton
              as={as}
              key={label}
              href={href}
              isActive={pathname === href}
              variant='text'
              className={s.item}
              onClick={() => {
                // if (label === t('create')) {
                //   createPostHandler();
                // }
                // if (label === t('logOut')) {
                //   show();
                // }
              }}
            >
              <Component
                width='1.5rem'
                height='1.5rem'
              />{' '}
              {isMobile ? '' : label}
            </PolymorphicButton>
          );
        })}
      </>
    </div>
  );
};
