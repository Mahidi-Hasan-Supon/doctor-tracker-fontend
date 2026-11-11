"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, LayoutDashboard, LogOut, ChevronDown } from "lucide-react";

import { useGetMe, useLogout } from "@/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const DashboardUserMenu = () => {
  const router = useRouter();
  const { data, isLoading } = useGetMe();
  const logoutMutation = useLogout();

  const user = data?.data;

  const name = user?.name || "Admin";
  const email = user?.email || "";
  const initials = name
    .split(" ")
    .map((part: string) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (isLoading) {
    return <div className="h-10 w-32 animate-pulse rounded-lg bg-muted" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="ghost"
          className="flex items-center gap-2 rounded-xl px-2"
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
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <p className="font-semibold">{name}</p>
          <p className="truncate text-xs font-normal text-muted-foreground">
            {email}
          </p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link href="/admin">
            <LayoutDashboard className="mr-2 size-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link href="/admin/profile">
            <User className="mr-2 size-4" />
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          disabled={logoutMutation.isPending}
          onClick={() => logoutMutation.mutate()}
          className="cursor-pointer text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 size-4" />
          {logoutMutation.isPending ? "Logging out..." : "Logout"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardUserMenu;
