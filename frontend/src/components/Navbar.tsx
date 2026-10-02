"use client";

import { LogOut } from "lucide-react";
import ConfirmationModal from "./ConfirmationModal";
import { useState } from "react";
import useAuth from "@/practice/auth/useAuth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [confirmation, setConfirmation] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  const onLogout = async () => {
    setIsLoggingOut(true);

    try {
      const res = await logout();
      toast.success(res.message || "Logged out");
      setConfirmation(false);
      router.replace("/login");
    } catch (error) {
      console.log("Error in log out: ", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoggingOut(false);
    }
  };
  return (
    <nav className="flex justify-between bg-zinc-100 p-4 border-b lg:px-20 sm:px-10 border-slate-200">
      <h3 className="text-2xl">Nav</h3>
      <ul>
        <li
          className="cursor-pointer hover:bg-red-200/50 transition rounded-lg p-2"
          onClick={() => setConfirmation(true)}
        >
          <LogOut color="red" size={20} />
        </li>
      </ul>
      <ConfirmationModal
        isOpen={confirmation}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        isLoading={isLoggingOut}
        onConfirm={onLogout}
        onCancel={() => setConfirmation(false)}
      />
    </nav>
  );
}
