"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type UseSearchParamWithKeyProps = {
  key: string;
  trim?: boolean;
};

export const useSearchParamWithKey = ({
  key,
  trim = true,
}: UseSearchParamWithKeyProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialValue = useMemo(() => {
    return searchParams.get(key) ?? "";
  }, [key, searchParams]);

  const syncSearchParam = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const normalizedValue = trim ? value.trim() : value;

      if (normalizedValue) {
        params.set(key, normalizedValue);
      } else {
        params.delete(key);
      }

      if (key === "s" || key === "fs") {
        params.delete("p");
        params.delete("ps");
      }

      const query = params.toString();
      const nextUrl = query ? `${pathname}?${query}` : pathname;

      router.replace(nextUrl, { scroll: false });
    },
    [key, pathname, router, searchParams, trim],
  );

  return {
    initialValue,
    syncSearchParam,
  };
};
