import * as Types from "../types/__generated__/graphql";

export type GetUsersQueryVariables = Types.Exact<{
  pageNumber?: Types.InputMaybe<Types.Scalars["Int"]["input"]>;
  pageSize?: Types.InputMaybe<Types.Scalars["Int"]["input"]>;
  searchTerm?: Types.InputMaybe<Types.Scalars["String"]["input"]>;
  sortBy?: Types.InputMaybe<Types.Scalars["String"]["input"]>;
  sortDirection?: Types.InputMaybe<Types.SortDirection>;
  statusFilter?: Types.InputMaybe<Types.UserBlockStatus>;
}>;

export type GetUsersQuery = {
  __typename?: "Query";
  getUsers: {
    __typename?: "UsersPaginationModel";
    pagination: {
      __typename?: "PaginationModel";
      page: number;
      pageSize: number;
      pagesCount: number;
      totalCount: number;
    };
    users: Array<{
      __typename?: "User";
      id: number;
      userName: string;
      email: string;
      createdAt: string;
      profile: {
        __typename?: "Profile";
        firstName?: string | null;
        lastName?: string | null;
        avatars?: Array<{ __typename?: "Avatar"; url?: string | null }> | null;
      };
      userBan?: {
        __typename?: "UserBan";
        reason: string;
        createdAt: string;
      } | null;
    }>;
  };
};
