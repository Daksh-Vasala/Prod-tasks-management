"use client";
import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { UserRole } from "../types/auth.types";

export default function AdminRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user === null) {
      router.replace("/login");
      return;
    }

    if (!isLoading && user?.userRole !== UserRole.ADMIN) {
      router.replace("/tasks");
    }
  }, [user, isLoading, router]);

  // if (isLoading) {
  //   return <h3 className="text-center text-lg font-semibold">Loading...</h3>;
  // }

  if (!user || user.userRole !== UserRole.ADMIN) {
    return null;
  }
  
  return <>{children}</>;
}
