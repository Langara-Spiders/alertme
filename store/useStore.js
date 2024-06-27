import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set, get) => ({
      user: {
        id: "",
        name: "",
        projectId: "",
        isStaff: "",
        token: "",
        access_token: "",
      },
      getUser: () => get().user,

      setUser: (token, access_token) => {
        const userInfo = jwtDecode(token);

        set((state) => ({
          user: {
            ...state.user,
            id: userInfo._id,
            name: userInfo.name,
            projectId: userInfo.project_id,
            isStaff: userInfo.is_staff,
            token,
            access_token,
          },
        }));
      },

      resetUser: () =>
        set(() => ({
          user: {
            id: "",
            name: "",
            projectId: "",
            isStaff: "",
            token: "",
            access_token: "",
          },
        })),
    }),
    {
      name: "app-storage",
      storage: {
        getItem: async () => {
          const value = await AsyncStorage.getItem("app-storage");
          return value ? JSON.parse(value) : {};
        },
        setItem: async (key, value) => {
          await AsyncStorage.setItem(key, JSON.stringify(value));
        },
      },
    }
  )
);

export default useStore;
