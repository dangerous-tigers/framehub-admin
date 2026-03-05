// =============================================
// Private Layout with Header and Sidebar
// =============================================

"use client";

import { ReactNode } from "react";

import { Header } from "@/widgets/header/ui/Header";
import { AppShell } from "@/app/ui/AppShell";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const isAuthenticated = true; // TODO: Replace with real auth check

  return (
    <>
      <Header />
      <AppShell isAuthenticated={isAuthenticated}>
        {children}
      </AppShell>
    </>
  );
}
