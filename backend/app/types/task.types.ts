export enum TaskStatus {
  PENDING = "pending",
  INPROGRESS = "in_progress",
  COMPLETED = "completed",
}

export type TaskUpdate = {
  title?: string,
  description?: string,
  status?: TaskStatus,
  updatedAt?: string
}