import { type NextRequest, NextResponse } from 'next/server';
import { HOME_ROUTE, ROOT_ROUTE, SESSION_COOKIE_NAME, ULASAN_ROUTE } from '@/constants/constant';

const protectedRoutes = [ULASAN_ROUTE];

export default function middleware(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value || '';

  // Redirect to login if session is not set
  if (!session && protectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL(ROOT_ROUTE, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  // Redirect to home if session is set and user tries to access root
  if (session && request.nextUrl.pathname === ROOT_ROUTE) {
    const absoluteURL = new URL(HOME_ROUTE, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}