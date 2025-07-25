// lib/store.ts
import { create } from "zustand";
import { User } from "../types/user";

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
