"use client";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { ReactNode } from "react";
import { DashboardSidebar } from "./sidebar";
import DashboardUserMenu from "./userDashboardMenu";

export default function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />

      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-background/95 px-4 backdrop-blur">
          <SidebarTrigger className="-ml-1" />

          <DashboardUserMenu />
        </header>

        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
