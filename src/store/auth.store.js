import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export const useAuthStore = create(
  devtools(
    persist(
      (set) => ({
        token: null,
        user: null,
        setToken: (token) => set({ token }),
        setUser: (user) => set({ user }),
        logout: () => set({ token: null, user: null }),
      }),
      { name: "auth-storage" }
    )
  )
);
