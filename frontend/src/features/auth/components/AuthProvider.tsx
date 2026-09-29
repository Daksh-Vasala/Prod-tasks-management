"use client";

import React, { createContext, useEffect, useState } from "react";
import { ApiResponse, LoginInput, User } from "../types/auth.types";
import {
  getMeService,
  loginService,
  logoutService,
} from "../services/auth.service";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (data: LoginInput) => Promise<ApiResponse<null>>;
  logout: () => Promise<ApiResponse<null>>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (data: LoginInput) => {
    const res = await loginService(data);
    await refreshUser();
    return res;
  };

  async function refreshUser() {
    try {
      const res = await getMeService();
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    const res = await logoutService();
    setUser(null)
    return res;
  }

  useEffect(() => {
    void refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
