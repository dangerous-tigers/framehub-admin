import { useState } from "react";

import { QueryGetFollowersArgs } from "@/types/__generated__/graphql";
import { useQuery } from "@apollo/client/react";

import { GET_FOLLOWERS_BY_USER } from "../api";

import { GetFollowersByUser } from "./types";

export const useQueryGetFollowersByUser = ({ userId }: { userId: number }) => {
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<{
    field: "createdAt" | "userName";
    direction: "asc" | "desc";
  }>({
    field: "createdAt",
    direction: "asc",
  });

  const onPageSizeChange = (value: string) => {
    const parsedPageSize = Number(value);

    if (Number.isNaN(parsedPageSize)) return;

    setPageSize(parsedPageSize);
    setCurrentPage(1);
  };

  const setCurrentPageAndSortBy = (
    field: "createdAt" | "userName",
    direction: "asc" | "desc",
  ) => {
    setCurrentPage(1);
    setSortBy({ field, direction });
  };

  const { data, loading } = useQuery<
    {
      getFollowers: GetFollowersByUser;
    },
    QueryGetFollowersArgs
  >(GET_FOLLOWERS_BY_USER, {
    variables: {
      userId: userId,
      pageSize: pageSize,
      pageNumber: currentPage,
      sortBy: sortBy.field,
      sortDirection: sortBy.direction as "asc" | "desc",
    },
  });

  return {
    data,
    loading,
    pageSize,
    onPageSizeChange,
    currentPage,
    setCurrentPage,
    sortBy,
    setCurrentPageAndSortBy,
  };
};
