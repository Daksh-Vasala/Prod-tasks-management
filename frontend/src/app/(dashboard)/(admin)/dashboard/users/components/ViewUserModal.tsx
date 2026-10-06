import { User } from "@/features/users/types/users.types";
import { X } from "lucide-react";

interface ViewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

export default function ViewUserModal({
  isOpen,
  onClose,
  user,
}: ViewUserModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="view-user-title"
        className="w-full max-w-lg rounded-2xl bg-white p-6 text-left shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-zinc-200 pb-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-lg font-semibold text-zinc-700">
              {user.userName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm text-zinc-500">User details</p>
              <h2
                id="view-user-title"
                className="mt-1 truncate text-xl font-semibold text-zinc-900"
              >
                {user.userName}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close user details"
            className="ml-3 shrink-0 cursor-pointer rounded-md p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
          >
            <X size={18} />
          </button>
        </div>

        <dl className="mt-2 divide-y divide-zinc-100">
          <div className="flex items-center justify-between gap-4 py-4">
            <dt className="text-sm font-medium text-zinc-500">ID</dt>
            <dd className="text-right text-sm text-zinc-800">{user.id}</dd>
          </div>

          <div className="flex items-center justify-between gap-4 py-4">
            <dt className="text-sm font-medium text-zinc-500">Email</dt>
            <dd className="break-all text-right text-sm text-zinc-800">
              {user.email}
            </dd>
          </div>

          <div className="flex items-center justify-between gap-4 py-4">
            <dt className="text-sm font-medium text-zinc-500">Phone number</dt>
            <dd className="text-right text-sm text-zinc-800">
              {user.phoneNumber}
            </dd>
          </div>

          <div className="flex items-center justify-between gap-4 py-4">
            <dt className="text-sm font-medium text-zinc-500">First name</dt>
            <dd className="text-right text-sm text-zinc-800">
              {user.firstName ?? "---"}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4 py-4">
            <dt className="text-sm font-medium text-zinc-500">Last name</dt>
            <dd className="text-right text-sm text-zinc-800">
              {user.lastName ?? "---"}
            </dd>
          </div>

          <div className="flex items-center justify-between gap-4 py-4">
            <dt className="text-sm font-medium text-zinc-500">Role</dt>
            <dd className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium capitalize text-zinc-700">
              {user.userRole}
            </dd>
          </div>

          <div className="flex items-center justify-between gap-4 py-4">
            <dt className="text-sm font-medium text-zinc-500">Status</dt>
            <dd
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                user.isActive
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-zinc-100 text-zinc-600"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  user.isActive ? "bg-emerald-500" : "bg-zinc-400"
                }`}
              />
              {user.isActive ? "Active" : "Inactive"}
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
