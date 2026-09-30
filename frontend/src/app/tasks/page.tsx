"use client";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";

export default function TasksPage() {
  return (
    <ProtectedRoute>
      <div>Tasks belong here</div>
    </ProtectedRoute>
  );
}
