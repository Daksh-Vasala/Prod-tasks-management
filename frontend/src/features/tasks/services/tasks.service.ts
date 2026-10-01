import api from "@/lib/axios";
import { TaskInput } from "../types/tasks.types";

export const getAllTasksService = async (token?: string) => {
  const res = await api.get("/tasks", {
    headers: {
      Cookie: token ? `token=${token}` : undefined,
    },
  });

  return res.data;
};

export const createTaskService = async (data: TaskInput) => {
  const res = await api.post("/tasks", data);

  return res.data;
};

export const getTaskByIdService = async (taskId: number) => {
  const res = await api.get(`/tasks/${taskId}`);

  return res.data;
};

export const updateTaskService = async (taskId: number, data: TaskInput) => {
  const res = await api.put(`/tasks/${taskId}`, data);

  return res.data;
};

export const deleteTaskService = async (taskId: number) => {
  const res = await api.delete(`/tasks/${taskId}`);

  return res.data;
};
