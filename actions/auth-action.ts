'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { HOME_ROUTE, DASHBOARD_ROUTE, ROOT_ROUTE, USER_SESSION_COOKIE_NAME, OWNER_SESSION_COOKIE_NAME } from '@/constants/constant';

import { checkCulinaryExist } from '@/services/firebase/auth-service'

export async function createSession(uid: string) {
  const culinaryExist = await checkCulinaryExist(uid);

  if (culinaryExist) {
    cookies().set(OWNER_SESSION_COOKIE_NAME, uid, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // One day
      path: '/',
    });
    redirect(DASHBOARD_ROUTE);
  } else {
    cookies().set(USER_SESSION_COOKIE_NAME, uid, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // One day
      path: '/',
    });
    redirect(HOME_ROUTE);
  }

}

export async function removeSession() {
  if (cookies().get(USER_SESSION_COOKIE_NAME)) {
    cookies().delete(USER_SESSION_COOKIE_NAME);
  } else if (cookies().get(OWNER_SESSION_COOKIE_NAME)) {
    cookies().delete(OWNER_SESSION_COOKIE_NAME);
  } 

  // redirect(ROOT_ROUTE);
}

export async function checkSession() {
  const userSession = cookies().get(USER_SESSION_COOKIE_NAME);
  const ownerSession = cookies().get(OWNER_SESSION_COOKIE_NAME);

  if (userSession) {
    return { type: 'user', value: userSession.value || null };
  } else if (ownerSession) {
    return { type: 'owner', value: ownerSession.value || null };
  } else {
    return null;
  }
}