"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  BadgeDollarSign,
  BadgeDollarSignIcon,
  BoxIcon,
  ChevronsUpDown,
  GalleryVerticalEnd,
  HomeIcon,
  LogOut,
  LucideIcon,
  ScrollTextIcon,
  Users,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Skeleton } from "./ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useEffect, useState } from "react";
import { ActiveOrganization } from "@/lib/auth-types";
import { error } from "console";
import Image from "next/image";

interface Items {
  title: string;
  href: string;
  icon: LucideIcon;
}

const menuItems: Items[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    title: "Produtos",
    href: "/produtos",
    icon: BoxIcon,
  },
  // {
  //   title: "Vendas",
  //   href: "/vendas",
  //   icon: BadgeDollarSignIcon,
  // },
  {
    title: "Clientes",
    href: "/clientes",
    icon: UsersIcon,
  },
  {
    title: "Catalogo",
    href: "/catalogo",
    icon: ScrollTextIcon,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <OrgMenu />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton tooltip={item.title} asChild>
                    <Link href={item.href} prefetch>
                      <item.icon className="size-4" />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}

function NavUser() {
  const router = useRouter();
  const isMobile = useSidebar();

  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <Skeleton className="h-10 w-full" />;
  }

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onRequest: () => {
          router.push("/login");
        },
      },
    });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size={"lg"}
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground border"
            >
              <Avatar>
                {session?.user?.image && (
                  <AvatarImage
                    src={session.user.image}
                    alt={session.user.name}
                  />
                )}
                <AvatarFallback className="rounded-lg">
                  {session?.user?.name?.split(" ")[0][0]}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                {session?.user.name && (
                  <span className="truncate font-medium">
                    {session?.user.name}
                  </span>
                )}
                {session?.user.email && (
                  <span className="truncate text-xs">{session.user.email}</span>
                )}
              </div>
              <ChevronsUpDown className="size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={"right"}
            align="end"
            sideOffset={12}
          >
            <DropdownMenuLabel className="flex-1 min-w-0 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Avatar>
                  {session?.user?.image && (
                    <AvatarImage
                      src={session.user.image}
                      alt={session.user.name}
                    />
                  )}
                  <AvatarFallback className="rounded-lg">
                    {session?.user?.name?.split(" ")[0][0]}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-xs leading-tight">
                  {session?.user.name && (
                    <span className="truncate font-medium">
                      {session?.user.name}
                    </span>
                  )}
                  {session?.user.email && (
                    <span className="truncate text-xs text-muted-foreground">
                      {session.user.email}
                    </span>
                  )}
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => handleLogout()}
                className="cursor-pointer"
              >
                <LogOut className="size-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function OrgMenu() {
  const router = useRouter();
  const [organizationActive, setOrganizationActive] =
    useState<ActiveOrganization | null>(null);

  useEffect(() => {
    const getCurrentOrg = async () => {
      const { data, error } =
        await authClient.organization.getFullOrganization();

      if (!error && data) {
        setOrganizationActive(data);
      }
    };

    getCurrentOrg();
  }, []);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
        >
          {organizationActive?.logo ? (
            <Image
              src={organizationActive.logo}
              alt="Logo"
              width={40}
              height={40}
              className="size-8 aspect-square rounded-lg"
            />
          ) : (
            <div>
              <GalleryVerticalEnd className="size-4" />
            </div>
          )}
          <div className="grid flex-1 text-left text-sm leading-tight">
            {organizationActive?.name ? (
              <span className="truncate font-medium">
                {organizationActive.name}
              </span>
            ) : (
              <span className="truncate font-medium">Nenhuma empresa</span>
            )}
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
