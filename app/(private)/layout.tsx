"use client";
import { ReactNode } from "react";

import { AppShell } from "@/app/ui/AppShell";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <AppShell>{children}</AppShell>;
}
