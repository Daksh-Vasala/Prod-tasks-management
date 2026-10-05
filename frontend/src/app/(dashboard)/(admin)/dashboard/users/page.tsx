import React from "react";
import UsersTable from "./components/UsersTable";
import { getAllUsersService } from "@/features/users/services/users.service";
import { cookies } from "next/headers";

export default async function UsersPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value;
  const res = await getAllUsersService(token);

  return (
    <div className="p-4">
      <UsersTable users={res.data} />
    </div>
  );
}
