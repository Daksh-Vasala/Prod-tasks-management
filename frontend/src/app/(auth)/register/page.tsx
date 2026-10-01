"use client";

import { registerService } from "@/features/auth/services/auth.service";
import { UserRole } from "@/features/auth/types/auth.types";
import axios from "axios";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function RegisterPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState<string | undefined>(undefined);
  const [lastName, setLastName] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await registerService({
        userName,
        email,
        password,
        phoneNumber,
        userRole: UserRole.SUBSCRIBER,
        firstName,
        lastName,
      });
      toast.success(res.message || "Registration successful");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrors(error.response?.data?.errors ?? {});
      } else {
        toast.error("Something went wrong");
        console.log("Error in registering: ", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center  justify-center bg-slate-50 px-6">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="mb-4 text-2xl font-bold text-slate-900 border-b border-zinc-200 text-center pb-3">
          Sign up
        </h1>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="text-slate-700" htmlFor="userName">
              User name
            </label>
            <input
              id="userName"
              name="userName"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              disabled={isLoading}
              className="rounded-lg border border-zinc-300 px-2 py-1 outline-blue-400"
              placeholder="johndoe"
            />
            <p className="text-red-400 text-sm">{errors.userName ?? ""}</p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-slate-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="rounded-lg border border-zinc-300 px-2 py-1 outline-blue-400"
              placeholder="test@example.com"
            />
            <p className="text-red-400 text-sm">{errors.email ?? ""}</p>
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
              disabled={isLoading}
              className="rounded-lg border border-zinc-300 px-2 py-1 outline-blue-400"
              placeholder="********"
            />
            <p className="text-red-400 text-sm">{errors.password ?? ""}</p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-slate-700" htmlFor="phoneNumber">
              Phone number
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              disabled={isLoading}
              className="rounded-lg border border-zinc-300 px-2 py-1 outline-blue-400"
              placeholder="9876543210"
            />
            <p className="text-red-400 text-sm">{errors.phoneNumber ?? ""}</p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-slate-700" htmlFor="firstName">
              First name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={isLoading}
              className="rounded-lg border border-zinc-300 px-2 py-1 outline-blue-400"
              placeholder="John"
            />
            <p className="text-red-400 text-sm">{errors.firstName ?? ""}</p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-slate-700" htmlFor="lastName">
              Last name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={isLoading}
              className="rounded-lg border border-zinc-300 px-2 py-1 outline-blue-400"
              placeholder="Doe"
            />
            <p className="text-red-400 text-sm">{errors.lastName ?? ""}</p>
          </div>

          <button
            className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 rounded-lg bg-blue-500 px-2 py-1 text-white transition hover:bg-blue-600 active:bg-blue-700"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? "Creating account..." : "Submit"}
          </button>
        </form>

        <div className="mt-5 flex justify-center gap-5">
          <p className="text-sm text-slate-500">Already have an account?</p>
          <Link href="/login" className="text-blue-700">
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
