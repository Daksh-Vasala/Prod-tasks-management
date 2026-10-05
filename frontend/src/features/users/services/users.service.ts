import api from "@/lib/axios";

export const getAllUsersService = async (token: string | undefined) => {
  const res = await api.get("/users", {
    headers: {
      Cookie: token ? `token=${token}` : undefined,
    },
  });

  return res.data;
};
