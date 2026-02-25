"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Followers, Following, Payment, UploadedPhotos } from "../ui";

export function useUserTabs({ userId }: { userId: number }) {
  const USER_TABS = [
    {
      value: "photos",
      label: "Uploaded photos",
      content: <UploadedPhotos userId={userId} />,
    },
    {
      value: "payments",
      label: "Payments",
      content: <Payment userId={userId} />,
    },
    {
      value: "followers",
      label: "Followers",
      content: <Followers userId={userId} />,
    },
    {
      value: "following",
      label: "Following",
      content: <Following userId={userId} />,
    },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "photos";

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
