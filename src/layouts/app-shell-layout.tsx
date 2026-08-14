import type { ReactNode } from "react";
import { AppSidebar } from "@ui/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@ui/sidebar";

export function AppShellLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Sticky top bar with sidebar toggle — hidden on mobile (bottom nav handles nav there) */}
        <header className="sticky top-0 z-20 hidden items-center gap-2 border-b border-border bg-background/95 px-4 backdrop-blur md:flex" style={{ height: "3rem" }}>
          <SidebarTrigger className="-ml-1" />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
