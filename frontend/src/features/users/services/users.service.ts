import api from "@/lib/axios";
import { UpdateUserInput } from "../types/users.types";

export const getAllUsersService = async (token?: string | undefined) => {
  const res = await api.get("/users", {
    headers: {
      Cookie: token ? `token=${token}` : undefined,
    },
  });

  return res.data;
};

export const updateUserService = async (
  userId: number,
  data: UpdateUserInput,
) => {
  const res = await api.patch(`/users/${userId}`, data);

  return res.data;
};
