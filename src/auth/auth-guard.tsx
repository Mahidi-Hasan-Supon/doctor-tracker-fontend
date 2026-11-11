"use client";

import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import AuthLoading from "./auth-loading";


interface IProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: IProps) => {
  const router = useRouter();
  const { isPending, isError, data } = useGetMe();

  const user = data?.data;

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

  return <>{children}</>;
};

export default AuthGuard;
