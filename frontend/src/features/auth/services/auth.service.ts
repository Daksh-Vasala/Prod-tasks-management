import api from "@/lib/axios";
import {
  ApiResponse,
  LoginInput,
  RegisterInput,
  User,
} from "../types/auth.types";

export const loginService = async (data: LoginInput) => {
  const res = await api.post<ApiResponse<null>>("/auth/login", data);

  return res.data;
};

export const registerService = async (data: RegisterInput) => {
  const res = await api.post<ApiResponse<null>>("/auth/register", data);

  return res.data;
};

export const getMeService = async () => {
  const res = await api.get<ApiResponse<User>>("/auth/me");

  return res.data;
};

export const logoutService = async () => {
  const res = await api.post<ApiResponse<null>>("/auth/logout");

  return res.data;
};
