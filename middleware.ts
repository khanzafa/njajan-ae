import { type NextRequest, NextResponse } from 'next/server';
import { HOME_ROUTE, ROOT_ROUTE, USER_SESSION_COOKIE_NAME, OWNER_SESSION_COOKIE_NAME, ULASAN_ROUTE } from '@/constants/constant';
import { checkCulinaryExist } from './services/firebase/auth-service';

const protectedRoutes = [ULASAN_ROUTE];

export default function middleware(request: NextRequest) {
  const session = request.cookies.get(USER_SESSION_COOKIE_NAME)?.value || request.cookies.get(OWNER_SESSION_COOKIE_NAME)?.value;

  // Redirect to login if session is not set
  if (!session && protectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL(ROOT_ROUTE, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  // Redirect to home if session is set and user tries to access root
  if (request.nextUrl.pathname === ROOT_ROUTE) {
    const absoluteURL = new URL(HOME_ROUTE, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  // Redirect to dashboard/[kulinerId] if session is set and user tries to access dashboard root
  if (session && request.nextUrl.pathname === '/dashboard') {
    const absoluteURL = new URL(`/dashboard/${session}`, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  // Redirect to home if session is set and user tries to access dashboard page

}