"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeartPulse, ChevronRight } from "lucide-react";

import { adminRoutes } from "@/routes/admin.routes";

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

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function DashboardSidebar() {
  const pathname = usePathname();

  const isRouteActive = (url: string) =>
    pathname === url || pathname.startsWith(`${url}/`);

  return (
    <Sidebar collapsible="icon">
      {/* Header / Logo */}
      <SidebarHeader className="border-b">
        <Link href="/admin" className="flex items-center gap-3 px-2 py-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-green-600 text-white shadow-sm">
            <HeartPulse size={21} />
          </div>

          <div className="grid flex-1 text-left leading-tight">
            <h2 className="text-lg font-bold tracking-tight">
              Doctor
              <span className="text-green-600">Tracker</span>
            </h2>
            <p className="mt-0.5 text-[10px] font-semibold tracking-[0.16em] text-muted-foreground">
              ADMIN PANEL
            </p>
          </div>
        </Link>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="gap-2 px-2 py-3">
        {adminRoutes.map((group) => (
          <SidebarGroup key={group.title} className="px-0">
            <SidebarGroupLabel className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {group.title}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {group.items.map((item) => {
                  {
                    /* Nested menu */
                  }
                  if ("items" in item) {
                    const Icon = item.icon;

                    const isChildActive = item.items.some((child) =>
                      isRouteActive(child.url),
                    );

                    return (
                      <Collapsible
                        key={item.title}
                        defaultOpen={isChildActive}
                        className="group/collapsible"
                      >
                        <SidebarMenuItem>
                          <CollapsibleTrigger
                            render={
                              <SidebarMenuButton
                                isActive={isChildActive}
                                tooltip={item.title}
                                className="w-full transition-colors hover:bg-green-50 hover:text-green-700 data-[active=true]:bg-green-600 data-[active=true]:font-semibold data-[active=true]:text-white"
                              >
                                <Icon size={18} />
                                <span>{item.title}</span>

                                <ChevronRight className="ml-auto size-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                              </SidebarMenuButton>
                            }
                          />

                          <CollapsibleContent>
                            <SidebarMenu className="ml-3 mt-1 gap-1 border-l border-border pl-2">
                              {item.items.map((child) => {
                                const ChildIcon = child.icon;
                                const isActive = isRouteActive(child.url);

                                return (
                                  <SidebarMenuItem key={child.title}>
                                    <SidebarMenuButton
                                      render={<Link href={child.url} />}
                                      isActive={isActive}
                                      tooltip={child.title}
                                      className="transition-colors hover:bg-green-50 hover:text-green-700 data-[active=true]:bg-green-600 data-[active=true]:font-semibold data-[active=true]:text-white"
                                    >
                                      <ChildIcon size={16} />
                                      <span>{child.title}</span>
                                    </SidebarMenuButton>
                                  </SidebarMenuItem>
                                );
                              })}
                            </SidebarMenu>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    );
                  }

                  {
                    /* Normal menu */
                  }
                  if ("url" in item) {
                    const Icon = item.icon;
                    const isActive = isRouteActive(item.url);

                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          render={<Link href={item.url} />}
                          isActive={isActive}
                          tooltip={item.title}
                          className="transition-colors hover:bg-green-50 hover:text-green-700 data-[active=true]:bg-green-600 data-[active=true]:font-semibold data-[active=true]:text-white"
                        >
                          <Icon size={18} />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  }

                  return null;
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
