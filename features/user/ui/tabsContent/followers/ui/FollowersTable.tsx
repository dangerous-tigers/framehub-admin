"use client";
import Link from "next/link";

import { Follow } from "@/types/__generated__/graphql";
import {
  Button,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@dangerous-tigers/framehub-ui-kit/components";

import { GetFollowersByUser } from "../model/types";

import s from "./FollowersTable.module.scss";

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
    return (
      <div>
        <p className={s.noContent}>No followers</p>
      </div>
    );
  }

  const SKELENON_COLUMN_COUNT = 4;

  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          <TableHead>{"user id"}</TableHead>
          <TableHead>
            <Button
              className={s.headBtn}
              variant="text"
              onClick={() =>
                setCurrentPageAndSortBy(
                  "userName",
                  sortBy.direction === "asc" ? "desc" : "asc",
                )
              }
            >
              Profile link{" "}
              <svg
                width="10"
                height="14"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 0L7.4641 4.5H0.535898L4 0Z" fill="#4C4C4C" />
                <path d="M4 12L0.535898 7.5L7.4641 7.5L4 12Z" fill="#4C4C4C" />
              </svg>
            </Button>
          </TableHead>
          <TableHead>{"User name"}</TableHead>
          <TableHead>
            <Button
              className={s.headBtn}
              variant="text"
              onClick={() =>
                setCurrentPageAndSortBy(
                  "createdAt",
                  sortBy.direction === "asc" ? "desc" : "asc",
                )
              }
            >
              Subscribed date{" "}
              <svg
                width="10"
                height="14"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 0L7.4641 4.5H0.535898L4 0Z" fill="#4C4C4C" />
                <path d="M4 12L0.535898 7.5L7.4641 7.5L4 12Z" fill="#4C4C4C" />
              </svg>
            </Button>
          </TableHead>
        </TableRow>
      </TableHeader>
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
                <TableCell>{follower.createdAt}</TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
}
