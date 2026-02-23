"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function useUserTabs() {
  const USER_TABS = [
    {
      value: "photos",
      label: "Uploaded photos",
      content: "Tab 1 content",
    },
    {
      value: "payments",
      label: "Payments",
      content: "Tab 2 content",
    },
    {
      value: "followers",
      label: "Followers",
      content: "Tab 3 content",
    },
    {
      value: "following",
      label: "Following",
      content: "Tab 4 content",
    },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "tab";

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    router.replace(`?${params.toString()}`);
  };

  return {
    USER_TABS,
    activeTab,
    handleTabChange,
  };
}
