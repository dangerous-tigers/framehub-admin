"use client";

import { useEffect, useState } from "react";

import { Select } from "@dangerous-tigers/framehub-ui-kit/components";

import {
  FILTER_OPTIONS,
  useFilterStatusParam,
} from "../model/useFilterStatusParam";

export const FilterStatus = () => {
  const { initialValue, syncFilterStatusParam } = useFilterStatusParam();
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <Select
      disabled={false}
      options={FILTER_OPTIONS}
      value={value}
      onValueChange={(nextFilter) => {
        setValue(nextFilter);
        syncFilterStatusParam(nextFilter);
      }}
      variant="default"
      width="210px"
    />
  );
};
