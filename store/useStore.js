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
        email: "",
        projectId: "",
        isStaff: false,
        token: "",
        access_token: "",
      },
      notifications: {},
      showTraffic: false,
      palette: {
        bg1: "#FFFFFF",
        bg2: "#F3F4F4",
        bg3: "#FFF0E5",
        bg4: "#FFFFFF",
        txt1: "#000000",
        txt2: "#1E1E1E",
        backButtonBg: "#F3F4F4",
        badgeBg: "#E6E7E8",
        primary1: "#FF6B02",
        primary2: "#FF6B02",
        loaderBg: "#FFF0E5",
      },
      theme: "light",
      getUser: () => get().user,

      setUser: (token, access_token) => {
        const userInfo = jwtDecode(token);

        set((state) => ({
          user: {
            ...state.user,
            id: userInfo._id,
            name: userInfo.name,
            email: userInfo.email,
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
            email: "",
            projectId: "",
            isStaff: "",
            token: "",
            access_token: "",
          },
        })),

      getNotifications: () => Object.values(get().notifications).reverse(),

      setNotifications: (notification) => {
        set((state) => {
          const notifications = {
            ...state.notifications,
          };
          notifications[notification.id] = notification;
          return { notifications };
        });
      },

      setShowTraffic: (value) => set({ showTraffic: value }),
      setPalette: (palette) => set({ palette }),
      setTheme: (theme) => set({ theme }),
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
