// =============================================
// AppShell - Layout Wrapper
// =============================================

"use client";

import { ReactNode } from "react";

import { Sidebar } from "@/widgets/sidebar";

interface AppShellProps {
  children: ReactNode;
  isAuthenticated?: boolean;
}

export function AppShell({ children, isAuthenticated = false }: AppShellProps) {
  return (
    <div className="mainBox">
      <main className="main">
        <div className="mainBoxBody">
          {isAuthenticated && <Sidebar />}
          {children}
        </div>
      </main>
    </div>
  );
}
