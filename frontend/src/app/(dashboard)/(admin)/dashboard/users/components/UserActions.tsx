"use client";
import { Edit, UserCheck, UserX, View } from "lucide-react";
import ViewUserModal from "./ViewUserModal";
import { useState } from "react";
import { UpdateUserInput, User } from "@/features/users/types/users.types";
import EditUserModal from "./EditUserModal";
import { updateUserService } from "@/features/users/services/users.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const onCloseModal = () => {
    setViewModal(false);
  };

  const onCloseEditModal = () => {
    setEditModal(false);
  };

  const onEdit = async (data: UpdateUserInput) => {
    try {
      const res = await updateUserService(user.id, data);
      if (!res.success) {
        throw new Error(res.message || "Failed to update user");
      }

      setEditModal(false);
      router.refresh();
      toast.success(res.message || "Updated successfully");
    } catch (error) {
      console.log("Error in updating user: ", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="flex items-center justify-end gap-1">
        <button
          type="button"
          aria-label="Edit user"
          className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-blue-100 hover:text-blue-900 active:bg-blue-200 active:text-blue-900"
          title="View"
          onClick={() => setViewModal(true)}
        >
          <View size={16} />
        </button>
        <button
          type="button"
          aria-label="Edit user"
          className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-200 hover:text-zinc-900 active:bg-zinc-300 active:text-zinc-900"
          title="Edit"
          onClick={() => setEditModal(true)}
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
      <EditUserModal
        isOpen={editModal}
        onClose={onCloseEditModal}
        user={user}
        onEdit={onEdit}
      />
    </>
  );
}
