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
  id: number,
  title: string;
  description?: string;
  status: TaskStatus;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}
