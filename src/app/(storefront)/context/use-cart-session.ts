import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type typeUser = "customer" | "admin";

interface SessionUser {
  id: string;
  email: string;
  name: string;
  type: typeUser;
}

interface UserState {
  user: SessionUser | null;
  signIn: (data: { user: SessionUser }) => void;
  signOut: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,

      signIn: ({ user }) => {
        set({ user });
      },

      signOut: () => {
        set({ user: null });
      },
    }),
    {
      name: "session_user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
