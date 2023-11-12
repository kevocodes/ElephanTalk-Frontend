import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useAuthStore = create(
  devtools((set) => ({
    token: null,
    setToken: (token) => set({ token }),
  }))
);
