'use server';

import { cookies } from 'next/headers';

import { AUTH_CONFIG } from '@/shared/config/auth';

export async function getAuthCookie() {
  return (await cookies()).get(AUTH_CONFIG.COOKIE_NAME)?.value;
}
