
"use client";

import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { useGetMe, useLogout } from "@/hooks";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

const DashboardUserMenu = () => {
  const router = useRouter();

  const { data, isLoading } = useGetMe();
  const logoutMutation = useLogout();

  const user = data?.data;

  const name = user?.name || "Admin";
  const email = user?.email || "";

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part: string) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        router.replace("/login");
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <div className="size-9 animate-pulse rounded-full bg-muted" />
        <div className="hidden space-y-1 sm:block">
          <div className="h-3 w-20 animate-pulse rounded bg-muted" />
          <div className="h-2.5 w-28 animate-pulse rounded bg-muted" />
        </div>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center gap-2 rounded-xl px-2 py-1.5 outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-green-600"
      >
        <Avatar className="size-9">
          <AvatarFallback className="bg-green-100 font-semibold text-green-700">
            {initials || "A"}
          </AvatarFallback>
        </Avatar>

        <div className="hidden text-left sm:block">
          <p className="text-sm font-semibold">{name}</p>
          <p className="max-w-32 truncate text-xs text-muted-foreground">
            {email}
          </p>
        </div>

        <ChevronDown className="size-4 text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        side="bottom"
        sideOffset={8}
        className="w-60"
      >
        {/* User Information */}
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <div className="flex flex-col gap-1 py-1">
              <span className="text-sm font-semibold text-foreground">
                {name}
              </span>
              <span className="truncate text-xs font-normal text-muted-foreground">
                {email}
              </span>
              <span className="mt-1 w-fit rounded-md bg-green-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-green-700">
                Administrator
              </span>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Dashboard */}
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => router.push("/admin")}
            className="cursor-pointer"
          >
            <LayoutDashboard className="mr-2 size-4" />
            <span>Dashboard</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuGroup>
          <DropdownMenuItem
            disabled={logoutMutation.isPending}
            onClick={handleLogout}
            variant="destructive"
            className="cursor-pointer"
          >
            <LogOut className="mr-2 size-4" />
            <span>
              {logoutMutation.isPending
                ? "Logging out..."
                : "Logout"}
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardUserMenu;
