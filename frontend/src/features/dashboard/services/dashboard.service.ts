import api from "@/lib/axios";

export const getDashboardStatsService = async (token?: string) => {
  const res = await api.get("/dashboard/stats", {
    headers: {
      Cookie: token ? `token=${token}` : undefined,
    },
  });

  return res.data;
};
