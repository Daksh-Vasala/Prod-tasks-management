"use client";

import {
  CheckSquare,
  LayoutDashboard,
  LogOut,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

import ConfirmationModal from "./ConfirmationModal";
import useAuth from "@/practice/auth/useAuth";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    label: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: User,
  },
];

export default function Navbar() {
  const [confirmation, setConfirmation] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const onLogout = async () => {
    setIsLoggingOut(true);

    try {
      const res = await logout();

      toast.success(res.message || "Logged out successfully");

      setConfirmation(false);
      router.replace("/login");
    } catch (error) {
      console.log("Error in log out:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:px-8 lg:px-12 xl:px-16">
          {/* Logo */}
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-sm font-bold text-white">
              T
            </div>

            <span className="hidden text-lg font-semibold tracking-tight text-zinc-900 sm:block">
              TaskFlow
            </span>
          </button>

          {/* Navigation */}
          <div className="flex items-center gap-1 rounded-xl border border-zinc-200 bg-zinc-50/80 p-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

              return (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => router.push(item.href)}
                  title={item.label}
                  aria-label={item.label}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-white text-zinc-900 shadow-sm ring-1 ring-zinc-200"
                      : "text-zinc-500 hover:bg-white/70 hover:text-zinc-900"
                  }`}
                >
                  <Icon size={17} strokeWidth={1.9} />

                  {/* Hide labels on smaller screens */}
                  <span className="hidden md:inline">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={() => setConfirmation(true)}
            title="Logout"
            aria-label="Logout"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-red-50 hover:text-red-600 active:bg-red-100"
          >
            <LogOut size={18} strokeWidth={1.9} />
          </button>
        </div>
      </nav>

      <ConfirmationModal
        isOpen={confirmation}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        isLoading={isLoggingOut}
        onConfirm={onLogout}
        onCancel={() => setConfirmation(false)}
      />
    </>
  );
}
