import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { AUTH_CONFIG } from '@/shared/config/auth';
import { ROUTES_CONFIG } from '@/shared/config/routes';

export default function proxy(request: NextRequest) {
  const authCookie = request.cookies.get(AUTH_CONFIG.COOKIE_NAME)?.value;

  const isPublicRoute = ROUTES_CONFIG.PUBLIC_ROUTES.some((route) => request.nextUrl.pathname.startsWith(route));

  if (!isPublicRoute && !authCookie) {
    return NextResponse.redirect(new URL(ROUTES_CONFIG.LOGIN, request.url));
  }

  if (authCookie && request.nextUrl.pathname === ROUTES_CONFIG.LOGIN) {
    return NextResponse.redirect(new URL(ROUTES_CONFIG.DEFAULT_REDIRECT, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
