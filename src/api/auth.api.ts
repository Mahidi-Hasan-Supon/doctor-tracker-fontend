import apiClient from "@/lib/apiClient";
import { LoginFormValues } from "@/validation";
import { RegisterFormValues } from "@/validation";


export const register = async (payload: RegisterFormValues) => {
  return await apiClient("/auth/register", {
    method: "POST",
    body: {
      name: payload.name,
      email: payload.email,
      password: payload.password,
    },
  });
};


export const login = async (payload: LoginFormValues) => {
  return await apiClient("/auth/login", {
    method: "POST",
    body: payload,
  });
};

export const getMe = async () => {
  return await apiClient("/auth/getMe", {
    method: "GET",
  });
};

export const logout = async () => {
  return await apiClient("/auth/logout", {
    method: "POST",
  });
};



