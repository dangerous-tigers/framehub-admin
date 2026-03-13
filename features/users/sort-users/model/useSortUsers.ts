// useSortUsers Hook

import { useCallback, useMemo, useState } from "react";

export type SortOption = "userName" | "createdAt";
export type SortDirection = "asc" | "desc";
export type SortPreset = "name-asc" | "name-desc" | "date-asc" | "date-desc";

interface UseSortUsersReturn {
  sortBy: SortOption;
  sortDirection: SortDirection;
  sortPreset: SortPreset;
  handleSortChange: (preset: SortPreset) => void;
}

export function useSortUsers(
  initialPreset: SortPreset = "date-desc",
): UseSortUsersReturn {
  const [sortPreset, setSortPreset] = useState<SortPreset>(initialPreset);

  const sortBy = useMemo<SortOption>(() => {
    return sortPreset.startsWith("name") ? "userName" : "createdAt";
  }, [sortPreset]);

  const sortDirection = useMemo<SortDirection>(() => {
    return sortPreset.endsWith("asc") ? "asc" : "desc";
  }, [sortPreset]);

  const handleSortChange = useCallback((preset: SortPreset) => {
    setSortPreset(preset);
  }, []);

  return {
    sortBy,
    sortDirection,
    sortPreset,
    handleSortChange,
  };
}
