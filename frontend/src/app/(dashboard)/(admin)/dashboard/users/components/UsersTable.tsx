import {
  Edit,
  Mail,
  Phone,
  ShieldCheck,
  Trash2,
  UserCheck,
  UserX,
} from "lucide-react";
import { User } from "@/features/users/types/users.types";
import UserActions from "./UserActions";

interface UsersTableProps {
  users: User[];
}

// Helper function to extract initials
const getInitials = (name: string) => {
  if (!name) return "?";
  const parts = name.trim().split(/[\s_.-]+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

export default function UsersTable({ users }: UsersTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-sm">
      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-200/80 bg-zinc-50/80 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              <th scope="col" className="px-6 py-3.5">
                User
              </th>
              <th scope="col" className="px-6 py-3.5">
                Email
              </th>
              <th scope="col" className="px-6 py-3.5">
                Phone
              </th>
              <th scope="col" className="px-6 py-3.5">
                Role
              </th>
              <th scope="col" className="px-6 py-3.5">
                Status
              </th>
              <th scope="col" className="px-6 py-3.5 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-200/60 bg-white">
            {users.map((user) => {
              const fullName =
                user.firstName || user.lastName
                  ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
                  : user.userName;

              const initials = getInitials(user.userName);

              return (
                <tr
                  key={user.id}
                  className="group transition-colors hover:bg-zinc-50/60"
                >
                  {/* User Profile Cell */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold text-white shadow-sm ring-1 ring-zinc-900/10">
                        {initials}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-medium text-zinc-900">
                          {fullName}
                        </p>
                        <p className="truncate text-xs text-zinc-500">
                          @{user.userName}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Email Cell */}
                  <td className="px-6 py-4 text-zinc-600">
                    <span className="truncate">{user.email}</span>
                  </td>

                  {/* Phone Cell */}
                  <td className="px-6 py-4 text-zinc-600 font-mono text-xs">
                    {user.phoneNumber || "—"}
                  </td>

                  {/* Role Badge Cell */}
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-zinc-100/80 px-2.5 py-1 text-xs font-medium capitalize text-zinc-700 ring-1 ring-inset ring-zinc-200/50">
                      <ShieldCheck className="h-3.5 w-3.5 text-zinc-500" />
                      {user.userRole}
                    </span>
                  </td>

                  {/* Status Cell */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge isActive={user.isActive} />
                  </td>

                  {/* Action Buttons Cell */}
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <UserActions userId={user.id} isActive={user.isActive} user={user} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="divide-y divide-zinc-200/60 bg-white md:hidden">
        {users.map((user) => {
          const fullName =
            user.firstName || user.lastName
              ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
              : user.userName;

          const initials = getInitials(user.userName);

          return (
            <div
              key={user.id}
              className="p-4 transition-colors hover:bg-zinc-50/50"
            >
              {/* Top Bar: Avatar with Initials, Info, and Status */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-900 font-semibold text-xs text-white ring-1 ring-zinc-900/10 shadow-sm">
                    {initials}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-base font-semibold text-zinc-900 leading-snug">
                      {fullName}
                    </p>
                    <p className="truncate text-xs font-medium text-zinc-500">
                      @{user.userName}
                    </p>
                  </div>
                </div>

                <StatusBadge isActive={user.isActive} />
              </div>

              {/* Contact Details Card */}
              <div className="mt-3.5 space-y-2 rounded-lg bg-zinc-50/80 p-3 text-xs text-zinc-600 ring-1 ring-zinc-200/50">
                <div className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 shrink-0 text-zinc-400" />
                  <span className="truncate font-medium">{user.email}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-zinc-400" />
                  <span className="font-medium">{user.phoneNumber || "—"}</span>
                </div>
              </div>

              {/* Bottom Actions & Role */}
              <div className="mt-3.5 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-zinc-100 px-2.5 py-0.5 text-xs font-medium capitalize text-zinc-600">
                  <ShieldCheck className="h-3.5 w-3.5 text-zinc-500" />
                  {user.userRole}
                </span>

                <div className="flex items-center gap-1">
                  {/* <UserActions userId={user.id} isActive={user.isActive}  /> */}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {users.length === 0 && (
        <div className="px-5 py-12 text-center">
          <p className="text-sm font-medium text-zinc-500">No users found.</p>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ isActive }: { isActive: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
        isActive
          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20"
          : "bg-zinc-100 text-zinc-600 ring-1 ring-zinc-200"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isActive ? "bg-emerald-500" : "bg-zinc-400"
        }`}
      />
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}
