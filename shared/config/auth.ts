export const AUTH_CONFIG = {
  COOKIE_MAX_AGE: 24 * 60 * 60,

  COOKIE_NAME: 'auth_credentials',

  COOKIE_PATH: '/',
  COOKIE_SAME_SITE: 'Strict' as const,

  MIN_PASSWORD_LENGTH: 5,

  MAX_EMAIL_LENGTH: 254,
} as const;
