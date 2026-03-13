// Private Layout with Header and Sidebar

"use client";

import { ReactNode } from "react";

import { Header } from "@/widgets/header/ui/Header";
import { Sidebar } from "@/widgets/sidebar";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="mainBoxBody">
        <Sidebar />
        <main className="main">{children}</main>
      </div>
    </>
  );
}
