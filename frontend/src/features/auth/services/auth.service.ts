import api from "@/lib/axios";
import { LoginInput } from "../types/auth.types";

export const login = async (data: LoginInput) => {
  const res = await api.post("/auth/login", data);

  return res.data;
};

export const getMe = async () => {
  const res = await api.get("/auth/me");

  return res.data;
}