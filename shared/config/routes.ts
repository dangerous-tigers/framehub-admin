export const ROUTES = {
  PRIVATE_ROUTES: ['/users', '/payments', '/posts', '/statistics'],

  PUBLIC_ROUTES: ['/login'],

  DEFAULT_REDIRECT_ROUTE: '/users',

  LOGIN_ROUTE: '/login',
} as const;

export type routes = (typeof ROUTES)[keyof typeof ROUTES];
