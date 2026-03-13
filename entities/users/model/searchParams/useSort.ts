import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useSort = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSort = useCallback(
    (targetSortBy: "userName" | "createdAt") => {
      const params = new URLSearchParams(searchParams.toString());
      const currentSortBy = params.get("sortBy") || "createdAt";
      const currentSortDirection = params.get("sortDirection") || "desc";

      const isSameSortBy = currentSortBy === targetSortBy;
      const nextSortDirection =
        isSameSortBy && currentSortDirection === "desc" ? "asc" : "desc";

      if (targetSortBy === "createdAt") {
        params.delete("sortBy");
      } else {
        params.set("sortBy", targetSortBy);
      }

      if (nextSortDirection === "desc") {
        params.delete("sortDirection");
      } else {
        params.set("sortDirection", "asc");
      }

      const query = params.toString();
      const nextUrl = query ? `${pathname}?${query}` : pathname;

      router.replace(nextUrl, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  return { handleSort };
};
