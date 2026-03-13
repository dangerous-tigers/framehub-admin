import {
  TableHead,
  TableHeader,
  TableRow,
} from "@dangerous-tigers/framehub-ui-kit/components";

export type SortField = "userName" | "createdAt";
export type SortDirection = "asc" | "desc";

export interface SortBy {
  field: SortField;
  direction: SortDirection;
}

export interface SortableHeaderProps {
  sortBy: SortBy;
  onSort: (field: SortField, direction: SortDirection) => void;
}

export function SortableHeader({ sortBy, onSort }: SortableHeaderProps) {
  const handleSort = (field: SortField) => {
    const newDirection =
      sortBy.field === field && sortBy.direction === "asc" ? "desc" : "asc";
    onSort(field, newDirection);
  };

  const getSortIcon = (field: SortField) => {
    if (sortBy.field !== field) {
      return (
        <svg
          width="10"
          height="14"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 0L7.4641 4.5H0.535898L4 0Z" fill="#666666" />
          <path d="M4 12L0.535898 7.5L7.4641 7.5L4 12Z" fill="#666666" />
        </svg>
      );
    }

    return sortBy.direction === "asc" ? (
      <svg
        width="10"
        height="14"
        viewBox="0 0 8 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M4 0L7.4641 4.5H0.535898L4 0Z" fill="#ffffff" />
      </svg>
    ) : (
      <svg
        width="10"
        height="14"
        viewBox="0 0 8 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M4 12L0.535898 7.5L7.4641 7.5L4 12Z" fill="#ffffff" />
      </svg>
    );
  };

  const buttonStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "0",
    margin: "0",
    border: "none",
    background: "none",
    cursor: "pointer",
    fontWeight: "inherit",
    color: "inherit",
  };

  return (
    <TableHeader>
      <TableRow>
        <TableHead>
          <button
            style={buttonStyle}
            onClick={() => handleSort("userName")}
            type="button"
          >
            User {getSortIcon("userName")}
          </button>
        </TableHead>
        <TableHead>Email</TableHead>
        <TableHead>
          <button
            style={buttonStyle}
            onClick={() => handleSort("createdAt")}
            type="button"
          >
            Registered {getSortIcon("createdAt")}
          </button>
        </TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}
