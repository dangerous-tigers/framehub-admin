"use client";

import { useSearchParamWithKey as useSearchParamWithKeyBase } from "@/entities/users/model/searchParams/useSearchParamWithKey";

const SEARCH_PARAM_KEY = "s";

export const useSearchParamWithKey = () => {
  return useSearchParamWithKeyBase({ key: SEARCH_PARAM_KEY });
};
