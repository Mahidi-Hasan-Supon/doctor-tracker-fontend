"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { adminRoutes } from "@/routes/admin.routes";

import { HeartPulse } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2 px-2 py-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-green-600 text-white">
            <HeartPulse size={22} />
          </div>

          <div>
            <h2 className="text-lg font-bold tracking-tight">
              Doctor<span className="text-green-600">Tracker</span>
            </h2>
            <p className="text-[10px] font-medium tracking-wider text-muted-foreground">
              ADMIN PANEL
            </p>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {adminRoutes.map((group : any) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item : any) => {
                  const Icon = item.icon;

                  const isActive =
                    item.url === "/admin"
                      ? pathname === "/admin"
                      : pathname === item.url ||
                        pathname.startsWith(`${item.url}/`);

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        render={<Link href={item.url} />}
                        isActive={isActive}
                        tooltip={item.title}
                        className="transition-colors data-[active=true]:bg-green-600 data-[active=true]:text-white hover:bg-green-50 hover:text-green-700"
                      >
                        <Icon size={18} />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
