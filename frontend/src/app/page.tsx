"use client";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { redirect } from "next/navigation";

export default function Home() {
  const { user } = useAuth();
  console.log(user);
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
          Welcome
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
          Prod Tasks Management
        </h1>
        <button
          onClick={() => redirect("/login")}
          className="mt-4 bg-gray-500 text-white rounded-xl px-3 py-2 cursor-pointer active:scale-98 transition-all"
        >
          Get started
        </button>
      </div>
    </main>
  );
}
