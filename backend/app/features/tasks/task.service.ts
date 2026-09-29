import db from "@/db/db";
import { TaskInput, TaskStatus, TaskUpdate } from "./task.types";
import { tasks, users } from "@/db/schema";
import { UserRole } from "@/app/types/auth.types";
import { and, asc, count, desc, eq, type SQL } from "drizzle-orm";

export const createTaskService = async (
  data: TaskInput,
  authenticatedUserId: number,
  userRole: UserRole,
  userId?: number,
) => {
  let userIdToUse = authenticatedUserId;
  if (userId) {
    if (userRole !== "admin") {
      throw new Error("FORBIDDEN");
    }

    userIdToUse = userId;
  }

  if (!userIdToUse) {
    throw new Error("UNAUTHORIZED");
  }

  const [newTask] = await db
    .insert(tasks)
    .values({ ...data, userId: userIdToUse })
    .returning();

  return newTask;
};

export const getTaskByIdService = async (
  taskId: number,
  userId: number,
  userRole: UserRole,
) => {
  const [task] = await db
    .select({
      id: tasks.id,
      title: tasks.title,
      description: tasks.description,
      status: tasks.status,
      userId: tasks.userId,
      user: {
        id: users.id,
        userName: users.userName,
        email: users.email,
        phoneNumber: users.phoneNumber,
        firstName: users.firstName,
        lastName: users.lastName,
        userRole: users.userRole,
        isActive: users.isActive,
      },
      createdAt: tasks.createdAt,
      updatedAt: tasks.updatedAt,
    })
    .from(tasks)
    .innerJoin(users, eq(users.id, tasks.userId))
    .where(eq(tasks.id, taskId));

  if (!task) {
    throw new Error("NOTFOUND");
  }

  if (userRole !== UserRole.Admin && task.userId !== userId) {
    throw new Error("FORBIDDEN");
  }

  return task;
};

export const getTasksService = async (
  userRole: UserRole,
  authenticatedUserId: number,
  userId?: number,
  status?: TaskStatus,
  page?: number,
  limit?: number,
  sortBy?: string,
  sortOrder?: string
) => {
  if (userId && userRole !== UserRole.Admin) {
    throw new Error("FORBIDDEN");
  }

  const whereQuery: SQL[] = [];

  if (userRole !== UserRole.Admin) {
    whereQuery.push(eq(tasks.userId, authenticatedUserId));
  }

  if (userId) {
    whereQuery.push(eq(tasks.userId, userId));
  }

  if (status) {
    whereQuery.push(eq(tasks.status, status));
  }

  const sortColumns = {
    title: tasks.title,
    status: tasks.status,
    createdAt: tasks.createdAt,
    updatedAt: tasks.updatedAt,
  } as const;

  const sortColumn =
    sortColumns[sortBy as keyof typeof sortColumns] ?? tasks.createdAt;

  const orderBy = sortOrder === "desc" ? desc(sortColumn) : asc(sortColumn);

  const offset = (page! - 1) * limit!;
  const pageLimit = limit ?? 10;
  
  const allTasks = await db
    .select({
      id: tasks.id,
      title: tasks.title,
      description: tasks.description,
      status: tasks.status,
      userId: tasks.userId,
      user: {
        id: users.id,
        userName: users.userName,
        email: users.email,
        phoneNumber: users.phoneNumber,
        firstName: users.firstName,
        lastName: users.lastName,
        userRole: users.userRole,
        isActive: users.isActive,
      },
      createdAt: tasks.createdAt,
      updatedAt: tasks.updatedAt,
    })
    .from(tasks)
    .innerJoin(users, eq(tasks.userId, users.id))
    .where(whereQuery.length > 0 ? and(...whereQuery) : undefined)
    .limit(pageLimit)
    .offset(offset)
    .orderBy(orderBy)

  const [{ total }] = await db
    .select({
      total: count(),
    })
    .from(tasks)
    .where(whereQuery.length > 0 ? and(...whereQuery) : undefined);
  
  const totalPages = Math.ceil(total / limit!)
  
  return {allTasks, total, totalPages};
};

export const updateTaskService = async (
  userRole: UserRole,
  authenticatedUserId: number,
  taskId: number,
  title?: string,
  description?: string,
  status?: TaskStatus,
) => {
  const [task] = await db
    .select({ userId: tasks.userId })
    .from(tasks)
    .where(eq(tasks.id, taskId));

  if (!task) {
    throw new Error("TASKNOTFOUND");
  }

  if (userRole !== UserRole.Admin && task.userId !== authenticatedUserId) {
    throw new Error("FORBIDDEN");
  }

  const dataToUpdate: TaskUpdate = {};

  if (title !== undefined) {
    dataToUpdate.title = title;
  }

  if (description !== undefined) {
    dataToUpdate.description = description;
  }
  if (status !== undefined) {
    dataToUpdate.status = status;
  }

  if (Object.keys(dataToUpdate).length === 0) {
    throw new Error("NOFIELDSTOUPDATE");
  }

  dataToUpdate.updatedAt = new Date().toISOString().slice(0, 10);

  const [updatedTask] = await db
    .update(tasks)
    .set(dataToUpdate)
    .where(eq(tasks.id, taskId))
    .returning();

  if (!updatedTask) {
    throw new Error("TASKNOTFOUND");
  }

  return updatedTask;
};

export const deleteTaskService = async (
  taskId: number,
  userRole: UserRole,
  authenticatedUserId: number,
) => {
  const [task] = await db
    .select({
      id: tasks.id,
      userId: tasks.userId,
    })
    .from(tasks)
    .where(eq(tasks.id, taskId));

  if (!task) {
    throw new Error("NOTFOUND");
  }

  if (userRole !== UserRole.Admin && task.userId !== authenticatedUserId) {
    throw new Error("FORBIDDEN");
  }

  const [deletedTask] = await db
    .delete(tasks)
    .where(eq(tasks.id, taskId))
    .returning();

  return deletedTask;
};
