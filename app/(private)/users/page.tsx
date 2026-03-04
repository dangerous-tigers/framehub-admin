"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import {
  Button,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@dangerous-tigers/framehub-ui-kit/components";

import { GET_USERS, GetUsersQuery, GetUsersQueryVariables } from "@/queries/getUsers";

type SortOption = "userName" | "createdAt";
type SortDirection = "asc" | "desc";
type SortPreset = "name-asc" | "name-desc" | "date-asc" | "date-desc";

export default function Users() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [sortPreset, setSortPreset] = useState<SortPreset>("date-desc");

  const sortBy: SortOption = sortPreset.startsWith("name") ? "userName" : "createdAt";
  const sortDirection: SortDirection = sortPreset.endsWith("asc") ? "asc" : "desc";

  const { data, loading, refetch } = useQuery<GetUsersQuery, GetUsersQueryVariables>(GET_USERS, {
    variables: {
      pageNumber: page,
      pageSize,
      sortBy,
      sortDirection,
    },
  });

  const handleSortChange = (value: SortPreset) => {
    setSortPreset(value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const users = data?.getUsers.users ?? [];
  const pagination = data?.getUsers.pagination;

  return (
    <div className="users-page">
      <div className="users-header">
        <h1 className="users-title">Users List</h1>
        <div className="users-controls">
          <Select
            options={[
              { value: "date-desc", label: "Newest first" },
              { value: "date-asc", label: "Oldest first" },
              { value: "name-asc", label: "From A to Z" },
              { value: "name-desc", label: "From Z to A" },
            ]}
            value={sortPreset}
            onValueChange={(value) => handleSortChange(value as SortPreset)}
            disabled={false}
            variant="default"
            width="200px"
          />
        </div>
      </div>

      <div className="users-table">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Registered</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="loading-cell">
                  Loading...
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="empty-cell">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="user-cell">
                      {user.profile.avatars?.[0]?.url && (
                        <img
                          src={user.profile.avatars[0].url}
                          alt={user.userName}
                          className="user-avatar"
                        />
                      )}
                      <span className="user-name">{user.userName}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {user.userBan ? (
                      <span className="status-banned">Banned</span>
                    ) : (
                      <span className="status-active">Active</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button variant="text" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && pagination.pagesCount > 1 && (
        <div className="users-pagination">
          <Button
            variant="outline"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="pagination-info">
            Page {page} of {pagination.pagesCount}
          </span>
          <Button
            variant="outline"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === pagination.pagesCount}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
