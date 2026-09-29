"use client";

import { getMe, login } from "@/features/auth/services/auth.service";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await login({ email, password });
    const user = await getMe();
    console.log(user)
    console.log(res);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-sm rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="mb-4 text-2xl font-bold text-slate-900">Sign in</h1>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="text-slate-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg border border-zinc-300 px-2 py-1 outline-blue-400"
              placeholder="test@example.com"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-slate-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg border border-zinc-300 px-2 py-1 outline-blue-400"
              placeholder="********"
            />
          </div>

          <button
            className="cursor-pointer  rounded-lg bg-blue-500 px-2 py-1 text-white transition hover:bg-blue-600 active:bg-blue-700"
            type="submit"
          >
            Submit
          </button>
        </form>

        <div className="mt-5 flex justify-center gap-5">
          <p className="text-sm text-slate-500">Don&apos;t have an account?</p>
          <Link href="/register" className="text-blue-700">
            Sign up
          </Link>
        </div>
      </div>
    </main>
  );
}
