// lib/store.ts
import { create } from "zustand";
import { User } from "../types/user";

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
  addFavorite: (serviceId: string) => void;
  removeFavorite: (serviceId: string) => void;
  toggleFavorite: (serviceId: string) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  addFavorite: (serviceId: string) =>
    set((state) => {
      const user = state.user;
      if (!user) return state;
      const ids = Array.from(new Set([...(user.favoriteServiceIds || []), serviceId]));
      return { user: { ...user, favoriteServiceIds: ids } } as any;
    }),
  removeFavorite: (serviceId: string) =>
    set((state) => {
      const user = state.user;
      if (!user) return state;
      const ids = (user.favoriteServiceIds || []).filter((id) => id !== serviceId);
      return { user: { ...user, favoriteServiceIds: ids } } as any;
    }),
  toggleFavorite: (serviceId: string) =>
    set((state) => {
      const user = state.user;
      if (!user) return state;
      const exists = (user.favoriteServiceIds || []).includes(serviceId);
      const ids = exists
        ? (user.favoriteServiceIds || []).filter((id) => id !== serviceId)
        : Array.from(new Set([...(user.favoriteServiceIds || []), serviceId]));
      return { user: { ...user, favoriteServiceIds: ids } } as any;
    }),
}));
