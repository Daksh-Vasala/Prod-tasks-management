import { Response } from "express";
import { TaskStatus } from "./task.types";
import { AuthRequest } from "@/app/types/express.types";
import {
  createTaskService,
  deleteTaskService,
  getTaskByIdService,
  getTasksService,
  updateTaskService,
} from "./task.service";

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const {
      title,
      description,
      status = TaskStatus.PENDING,
      userId,
    } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    if (!Object.values(TaskStatus).includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status is invalid",
      });
    }

    const userRole = req.userRole;
    if (!userRole) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const newTask = await createTaskService(
      { title, description, status },
      Number(req.userId),
      userRole,
      userId,
    );

    if (!newTask) {
      return res.status(500).json({
        success: false,
        message: "Failed to create task",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: newTask,
    });
  } catch (error) {
    console.log("Error in create task: ", error);

    if (error instanceof Error && error.message === "FORBIDDEN") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Only admin can create tasks for others",
      });
    }

    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getTaskById = async (req: AuthRequest, res: Response) => {
  try {
    const taskId = Number(req.params.id);

    if (!Number.isInteger(taskId) || taskId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Task id is invalid",
      });
    }

    if (!req.userRole) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const task = await getTaskByIdService(
      Number(taskId),
      Number(req.userId),
      req.userRole,
    );

    return res.status(200).json({
      success: true,
      message: "Task fetched successfully",
      data: task,
    });
  } catch (error) {
    console.log("Error in fetching task: ", error);

    if (error instanceof Error && error.message === "FORBIDDEN") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Only admin can access other users task",
      });
    }

    if (error instanceof Error && error.message === "NOTFOUND") {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const userIdParam = req.query.userId;
    const userId = userIdParam ? Number(userIdParam) : undefined;

    const statusParam = req.query.status;
    const status = statusParam as TaskStatus | undefined;

    const pageParam = req.query.page;
    const limitParam = req.query.limit;

    const page = pageParam === undefined ? 1 : Number(pageParam);
    const limit = limitParam === undefined ? 10 : Number(limitParam);

    const sortByParam = req.query.sortBy;
    const sortOrderParam = req.query.sortOrder;

    const sortBy =
      sortByParam === undefined ? "createdAt" : String(sortByParam);
    const sortOrder =
      sortOrderParam === undefined ? "desc" : String(sortOrderParam);

    if (
      sortByParam &&
      sortByParam !== "title" &&
      sortByParam !== "status" &&
      sortByParam !== "createdAt" &&
      sortByParam !== "updatedAt"
    ) {
      return res.status(400).json({
        success: false,
        message: "Sort by param is invalid",
      });
    }

    if (
      sortOrderParam &&
      sortOrderParam !== "desc" &&
      sortOrderParam !== "asc"
    ) {
      return res.status(400).json({
        success: false,
        message: "Sort order param is invalid",
      });
    }

    if (page !== undefined && (!Number.isInteger(page) || page <= 0)) {
      return res.status(400).json({
        success: false,
        message: "Page param is invalid",
      });
    }

    if (
      limit !== undefined &&
      (!Number.isInteger(limit) || limit <= 0 || limit > 100)
    ) {
      return res.status(400).json({
        success: false,
        message: "Limit param is invalid",
      });
    }

    if (userId !== undefined && (!Number.isInteger(userId) || userId <= 0)) {
      return res.status(400).json({
        success: false,
        message: "User id is invalid",
      });
    }

    if (status && !Object.values(TaskStatus).includes(status as TaskStatus)) {
      return res.status(400).json({
        success: false,
        message: "Status value is invalid",
      });
    }

    if (req.userId === undefined) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (req.userRole === undefined) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { allTasks, total, totalPages } = await getTasksService(
      req.userRole,
      Number(req.userId),
      userId,
      status,
      page,
      limit,
      sortBy,
      sortOrder,
    );

    return res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      data: allTasks,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages ? true : false,
        hasPreviousPage: page > 1 ? true : false,
      },
    });
  } catch (error) {
    console.log("Error in fetching tasks: ", error);

    if (error instanceof Error && error.message === "FORBIDDEN") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Only admin can acess other user's task",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const taskId = req.params.id;
    const { title, description, status } = req.body;

    if (!taskId || Number(taskId) <= 0 || Number.isNaN(Number(taskId))) {
      return res.status(400).json({
        success: false,
        message: "Task id is invalid",
      });
    }

    if (status && !Object.values(TaskStatus).includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    if (req.userRole === undefined) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const updatedTask = await updateTaskService(
      req.userRole,
      Number(req.userId),
      Number(taskId),
      title,
      description,
      status,
    );

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    console.log("Error in updating tasks: ", error);

    if (error instanceof Error && error.message === "FORBIDDEN") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Only admin can update other user's task",
      });
    }

    if (error instanceof Error && error.message === "NOFIELDSTOUPDATE") {
      return res.status(400).json({
        success: false,
        message: "No fields to update",
      });
    }

    if (error instanceof Error && error.message === "TASKNOTFOUND") {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const taskId = Number(req.params.id);

    if (!Number.isInteger(taskId) || taskId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Task id is not valid",
      });
    }

    if (req.userRole === undefined) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const deletedTask = await deleteTaskService(
      Number(taskId),
      req.userRole,
      Number(req.userId),
    );

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: deletedTask,
    });
  } catch (error) {
    console.log("Error in deleting task: ", error);

    if (error instanceof Error && error.message === "NOTFOUND") {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (error instanceof Error && error.message === "FORBIDDEN") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Only admin can delete other user's task",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
