"use client";
import { Edit, UserCheck, UserX, View } from "lucide-react";
import ViewUserModal from "./ViewUserModal";
import { useState } from "react";
import { User } from "@/features/users/types/users.types";

interface UserActionsProps {
  userId: number;
  isActive: boolean;
  user: User;
}

export default function UserActions({
  userId,
  isActive,
  user,
}: UserActionsProps) {
  const [viewModal, setViewModal] = useState(false);

  const onCloseModal = () => {
    setViewModal(false);
  };
  return (
    <>
      <div className="flex items-center justify-end gap-1">
        <button
          type="button"
          aria-label="Edit user"
          className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-blue-100 hover:text-blue-900 active:bg-blue-200 active:text-blue-900"
          title="Edit"
          onClick={() => setViewModal(true)}
        >
          <View size={16} />
        </button>
        <button
          type="button"
          aria-label="Edit user"
          className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-200 hover:text-zinc-900 active:bg-zinc-300 active:text-zinc-900"
          title="Edit"
        >
          <Edit size={16} />
        </button>
        <button
          type="button"
          aria-label="Delete user"
          className={`rounded-lg p-2 ${!isActive ? "hover:bg-blue-50 hover:text-blue-600 active:bg-blue-100 active:text-blue-600" : "hover:bg-red-100 hover:text-red-600 active:bg-red-200 active:text-red-600"} text-zinc-400 transition-all`}
          title={`${isActive ? "Deactivate" : "Activate"}`}
        >
          {isActive ? <UserX size={16} /> : <UserCheck size={16} />}
        </button>
      </div>
      <ViewUserModal isOpen={viewModal} onClose={onCloseModal} user={user} />
    </>
  );
}
