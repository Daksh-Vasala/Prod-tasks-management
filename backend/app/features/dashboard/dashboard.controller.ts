import { AuthRequest } from "@/app/types/express.types";
import { Response } from "express";
import { dashboardStatsService } from "./dashboard.service";

export const dashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    const stats = await dashboardStatsService();

    return res.status(200).json({
      succees: true,
      message: "Statistics fetched successfully",
      data: {
        totalUsers: stats.allUsers,
        activeUsers: stats.activeUsers,
        inActiveUsers: stats.inActiveUsers,
        totalTasks: stats.allTasks,
        pendingTasks: stats.pendingTasks,
        inProgressTasks: stats.inProgressTasks,
        completedTasks: stats.completedTasks,
      },
    });
  } catch (error) {
    console.error("Error in fetching stats : ", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
