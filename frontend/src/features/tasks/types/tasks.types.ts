export enum TaskStatus {
  PENDING = "pending",
  INPROGRESS = "in_progress",
  COMPLETED = "completed",
}

export interface TaskInput {
  title: string;
  description?: string;
  status: TaskStatus;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskFilters {
  status?: TaskStatus;
  userId?: number;
  page?: number;
  limit?: number;
  sortBy?: "title" | "status" | "createdAt" | "updatedAt";
  sortOrder?: "desc" | "asc";
}

export interface TaskPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface TaskListResponse {
  success: boolean,
  message: string,
  data: Task[];
  pagination: TaskPagination;
}
