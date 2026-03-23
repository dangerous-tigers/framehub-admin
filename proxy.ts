import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { AUTH_CONFIG } from '@/shared/config/auth';
import { ROUTES } from '@/shared/config/routes';

function matchesRoutePrefix(pathname: string, routePrefix: string) {
  return pathname === routePrefix || pathname.startsWith(`${routePrefix}/`);
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const authCookie = request.cookies.get(AUTH_CONFIG.COOKIE_NAME)?.value;

  const isPublicRoute = ROUTES.PUBLIC_ROUTES.some((route) => matchesRoutePrefix(pathname, route));
  const isPrivateRoute = ROUTES.PRIVATE_ROUTES.some((route) => matchesRoutePrefix(pathname, route));

  if (!authCookie) {
    return isPublicRoute ? NextResponse.next() : NextResponse.redirect(new URL(ROUTES.LOGIN_ROUTE, request.url));
  }

  return isPrivateRoute
    ? NextResponse.next()
    : NextResponse.redirect(new URL(ROUTES.DEFAULT_REDIRECT_ROUTE, request.url));
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
