export const ROUTES = {
  USERS_LIST: "users-list",
  PAYMENTS_LIST: "payments-list",
  POSTS_LIST: "posts-list",
  STATISTICS: "statistics",
  EMPTY: "",
} as const;

export type routes = (typeof ROUTES)[keyof typeof ROUTES];
