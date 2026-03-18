import { type ElementType } from 'react';

import { CreditCardOutline, Image, LogOut, Person, TrendingUp } from '@/assets/icons';
import { ROUTES } from '@/shared/config/routes';

export const navigationItems: NavigationItem[] = [
  { href: ROUTES.USERS, label: 'sidebar', Component: Person },
  { href: ROUTES.STATISTICS, label: 'statistic', Component: TrendingUp },
  {
    href: ROUTES.PAYMENTS,
    label: 'payments list',
    Component: CreditCardOutline,
  },
  { href: ROUTES.POSTS, label: 'posts list', Component: Image },
  { href: ROUTES.EMPTY, label: 'logout', Component: LogOut },
];

export type NavigationItem = {
  href?: string;
  label: string;
  Component: ElementType;
  disabled?: boolean;
  as?: ElementType;
};
