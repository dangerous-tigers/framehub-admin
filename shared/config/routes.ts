export const ROUTES_CONFIG = {
  PUBLIC_ROUTES: ['/login'] as const,
  PRIVATE_ROUTES: ['/users', '/payments', '/posts', '/statistics'] as const,
  DEFAULT_REDIRECT: '/users',
  LOGIN: '/login',
} as const;

export const ROUTES = {
  USERS: '/users',
  PAYMENTS: '/payments',
  POSTS: '/posts',
  STATISTICS: '/statistics',
  EMPTY: '',
} as const;

export type routes = (typeof ROUTES)[keyof typeof ROUTES];
