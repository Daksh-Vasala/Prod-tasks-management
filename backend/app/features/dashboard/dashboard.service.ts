import db from "@/db/db";
import { tasks, users } from "@/db/schema";
import { TaskStatus } from "../tasks/task.types";

const userColumns = {
  id: users.id,
  userName: users.userName,
  email: users.email,
  phoneNumber: users.phoneNumber,
  firstName: users.firstName,
  lastName: users.lastName,
  userRole: users.userRole,
  isActive: users.isActive,
  createdAt: users.createdAt,
  updatedAt: users.updatedAt,
};

const taskColumns = {
  id: tasks.id,
  title: tasks.title,
  description: tasks.description,
  status: tasks.status,
  userId: tasks.userId,
  createdAt: tasks.createdAt,
  updatedAt: tasks.updatedAt,
};

export const dashboardStatsService = async () => {
  const allUsers = await db.select(userColumns).from(users);

  const activeUsers = allUsers.filter((users) => users.isActive).length;
  const inActiveUsers = allUsers.filter((users) => !users.isActive).length;

  const allTasks = await db.select(taskColumns).from(tasks);

  const pendingTasks = allTasks.filter(
    (tasks) => tasks.status === TaskStatus.PENDING,
  ).length;
  const inProgressTasks = allTasks.filter(
    (tasks) => tasks.status === TaskStatus.INPROGRESS,
  ).length;
  const completedTasks = allTasks.filter(
    (tasks) => tasks.status === TaskStatus.COMPLETED,
  ).length;

  return {
    allUsers: allUsers.length,
    activeUsers,
    inActiveUsers,
    allTasks: allTasks.length,
    pendingTasks,
    inProgressTasks,
    completedTasks,
  };
};
