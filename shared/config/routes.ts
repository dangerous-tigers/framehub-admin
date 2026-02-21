export const ROUTES = {
  USERS: "users",
  PAYMENTS: "payments",
  POSTS: "posts",
  STATISTICS: "statistics",
  EMPTY: "",
} as const;

export type routes = (typeof ROUTES)[keyof typeof ROUTES];
