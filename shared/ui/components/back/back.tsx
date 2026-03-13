"use client";

import { useRouter } from "next/navigation";
import clsx from "clsx";

import { Button } from "@dangerous-tigers/framehub-ui-kit/components";
import ArrowBackOutline from "@dangerous-tigers/framehub-ui-kit/icons/ArrowBackOutline";

import s from "./Back.module.scss";

export function Back({
  icon = <ArrowBackOutline width={24} height={24} />,
  label = "Back",
  path = "/",
  className,
}: {
  icon?: React.ReactNode;
  label?: string;
  path?: string;
  className?: string;
}) {
  const router = useRouter();
  return (
    <Button
      className={clsx(s.root, className)}
      variant="text"
      onClick={() => router.push(path)}
    >
      {icon} {label}
    </Button>
  );
}
