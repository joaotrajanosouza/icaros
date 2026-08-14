import type { ReactNode } from "react";
import { AppSidebar } from "@ui/app-sidebar";
import { SidebarInset, SidebarProvider } from "@ui/sidebar";

export function AppShellLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
