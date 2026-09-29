"use client"
import { useEffect, useState } from "react";
import { User } from "../types/auth.types";
import { getMe } from "../services/auth.service";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let active = true;

    async function loadUser() {
      try {
        const res = await getMe();
        console.log(res)
        if (active) setUser(res.data);
      } catch (error) {
        if (active) setUser(null);
        console.log("Error in fetching user: ", error);
      }
    }

    void loadUser();

    return () => {
      active = false;
    };
  }, []);

  return { user };
};
