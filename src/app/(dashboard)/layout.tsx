import { ReactNode } from "react";
import DashboardShell from "@/components/dashboard/shell";
import RoleGuard from "@/auth/role-guard";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <RoleGuard roles={["ADMIN"]}>
      <DashboardShell>{children}</DashboardShell>
    </RoleGuard>
  );
};

export default DashboardLayout;