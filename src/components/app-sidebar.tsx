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
} from "@/components/ui/sidebar";
import {
  BadgeDollarSign,
  BadgeDollarSignIcon,
  BoxIcon,
  HomeIcon,
  LucideIcon,
  ScrollTextIcon,
  Users,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";

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
  {
    title: "Vendas",
    href: "/vendas",
    icon: BadgeDollarSignIcon,
  },
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
      <SidebarHeader />
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
      <SidebarFooter />
    </Sidebar>
  );
}
