"use client"
import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user === null) {
      router.replace("/login");
    }
  }, [isLoading, user, router]);

  if (user === null) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
