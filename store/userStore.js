import { create } from "zustand";

const useUserStore = create((set) => ({
  user: {
    name: "",
    email: "",
    token: "",
  },
  setUser: (user) => set((state) => ({ user: { ...state.user, ...user } })),
  clearUser: () => set({ user: { name: "", email: "", token: "" } }),
}));

export default useUserStore;
