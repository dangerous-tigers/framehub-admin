"use client";

import { useSearchParams } from "next/navigation";

import {
  QueryGetUsersArgs,
  UserBlockStatus,
  UsersPaginationModel,
} from "@/types/__generated__/graphql";
import { useQuery } from "@apollo/client/react";

import { GET_LIST_USERS } from "../api/getListUsers.query";

export const useQueryGetListUsers = () => {
  const searchParams = useSearchParams();
  const statusFilter = searchParams.get("fs") || "ALL";
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const sortDirection = searchParams.get("sortDirection") || "desc";
  const pageNumber = searchParams.get("p") || "1";
  const pageSize = searchParams.get("ps") || "10";

  const { loading, error, data } = useQuery<
    { getUsers: UsersPaginationModel },
    QueryGetUsersArgs
  >(GET_LIST_USERS, {
    variables: {
      searchTerm: searchParams.get("s"),
      statusFilter: statusFilter as UserBlockStatus,
      sortBy,
      sortDirection: sortDirection as "asc" | "desc",
      pageNumber: parseInt(pageNumber, 10),
      pageSize: parseInt(pageSize, 8),
    },
  });

  return {
    data: data?.getUsers,
    loading,
    error,
  };
};
