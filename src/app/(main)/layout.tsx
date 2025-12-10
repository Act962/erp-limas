import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";
import { requireAuth, requireAuthOrg } from "@/lib/auth-utils";
import { ModalProvider } from "@/components/providers/modal-provider";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth();
  await requireAuthOrg();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <ModalProvider />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
