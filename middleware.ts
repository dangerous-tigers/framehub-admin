import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth_token")?.value;
  const isLoginPage = request.nextUrl.pathname === "/login";
  const isRootPath = request.nextUrl.pathname === "/";
  const isPrivatePage =
    request.nextUrl.pathname.startsWith("/users") ||
    request.nextUrl.pathname.startsWith("/payments") ||
    request.nextUrl.pathname.startsWith("/posts") ||
    request.nextUrl.pathname.startsWith("/statistics");

  // Редирект с корня на /login
  if (isRootPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Если нет токена и пытаемся зайти на приватную страницу → редирект на /login
  if (!authToken && isPrivatePage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Если есть токен и пытаемся зайти на /login → редирект на /users
  if (authToken && isLoginPage) {
    return NextResponse.redirect(new URL("/users", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
