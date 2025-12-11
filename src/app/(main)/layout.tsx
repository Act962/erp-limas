import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";
import { requireAuth, requireAuthOrg } from "@/lib/auth-utils";
import { ModalProvider } from "@/components/providers/modal-provider";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { AppHeader } from "@/components/app-header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth();
  // await requireAuthOrg();

  return (
    <SidebarProvider className="flex h-screen overflow-hidden">
      <AppSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AppHeader />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6 space-y-6">
            <BreadcrumbNav />
            {children}
          </div>
        </main>
      </div>
      <ModalProvider />
    </SidebarProvider>
  );
}
