import api from "@/lib/axios";
import { ApiResponse, LoginInput, RegisterInput, User } from "../types/auth.types";

export const login = async (data: LoginInput) => {
  const res = await api.post<ApiResponse<null>>("/auth/login", data);

  return res.data;
};

export const register = async (data: RegisterInput) => {
  const res = await api.post<ApiResponse<null>>("/auth/register", data);

  return res.data;
};

export const getMe = async () => {
  const res = await api.get<ApiResponse<User>>("/auth/me");

  return res.data;
};
