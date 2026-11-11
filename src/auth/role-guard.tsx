"use client";

import { useGetMe } from "@/hooks";
import { UserRole } from "@/types";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import AuthLoading from "./auth-loading";
import AccessDenied from "./access-denied";

interface IProps {
  children: ReactNode;
  roles: UserRole[];
}

const RoleGuard = ({ children, roles }: IProps) => {
  const router = useRouter();
  const { isPending, isError, data } = useGetMe();

  const user = data?.data;
  const isAuthorization = !!user && roles.includes(user.role);

  useEffect(() => {
    if (!isPending && (isError || !user)) {
      router.replace("/login");
    }
  }, [router, user, isError, isPending]);
  if (isPending) {
    return <AuthLoading />;
  }

  if (isError || !user) {
    return <AuthLoading lebel="Redirecting..." />;
  }

  if (isAuthorization) {
    return <>{children}</>;
  }

  return <AccessDenied />;
};

export default RoleGuard;
