
"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  login,
  getMe,
  logout,
  register,
} from "@/api/auth.api";



export const useRegister = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: register,

    onSuccess: (data) => {
      toast.success(data.message || "Registration successful!");
    },

    onError: (error: Error) => {
      toast.error(error.message || "Registration failed!");
    },
  });
};


export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: login,

    onSuccess: async (data) => {
      toast.success(data.message || "Login successful!");

      await queryClient.invalidateQueries({
        queryKey: ["current-user"],
      });
    },

    onError: (error: Error) => {
      toast.error(error.message || "Login failed!");
    },
  });
};


export const useGetMe = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: getMe,
    retry: false,
    staleTime: 60 * 1000,
  });
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,

    onSuccess: () => {
      queryClient.clear();
      toast.success("Logged out successfully!");
      router.replace("/login");
    },

    onError: (error: Error) => {
      toast.error(error.message || "Logout failed!");
    },
  });
};
