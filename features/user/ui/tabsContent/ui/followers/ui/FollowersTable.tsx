"use client";
import Link from "next/link";

import { formatDate } from "@/shared/lib";
import { Follow } from "@/types/__generated__/graphql";
import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@dangerous-tigers/framehub-ui-kit/components";

import { NoTableContent } from "../../NoTableContent";
import { SortableHeader } from "../../SortableHeader";
import { GetFollowersByUser } from "../model/types";

export function FollowersTable({
  followers,
  loading,
  pageSize,
  className,
  sortBy,
  setCurrentPageAndSortBy,
}: {
  followers?: GetFollowersByUser["items"];
  loading: boolean;
  pageSize: number;
  className?: string;
  sortBy: {
    field: "createdAt" | "userName";
    direction: "asc" | "desc";
  };
  setCurrentPageAndSortBy: (
    field: "createdAt" | "userName",
    direction: "asc" | "desc",
  ) => void;
}) {
  if (followers?.length === 0) {
    return <NoTableContent />;
  }

  const SKELENON_COLUMN_COUNT = 4;

  return (
    <Table className={className}>
      <SortableHeader
        sortBy={sortBy}
        setCurrentPageAndSortBy={setCurrentPageAndSortBy}
      />
      <TableBody>
        {loading
          ? [...Array(pageSize)].map((_, index) => (
              <TableRow key={index}>
                {[...Array(SKELENON_COLUMN_COUNT)].map((_, index) => (
                  <TableCell key={index}>
                    <Skeleton style={{ width: "150px", height: "22px" }} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          : followers?.map((follower: Follow) => (
              <TableRow key={follower.userId}>
                <TableCell>{follower.userId}</TableCell>
                <TableCell>
                  <Link
                    style={{ textDecoration: "underline" }}
                    href={`/users/${follower.userId}`}
                  >
                    {follower.userName}
                  </Link>
                </TableCell>
                <TableCell>{follower.userName}</TableCell>
                <TableCell>{formatDate(follower.createdAt)}</TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
}
