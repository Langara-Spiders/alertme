import * as Location from "expo-location";
import * as Notifications from "expo-notifications";

import React, { createContext, useEffect } from "react";

import { Platform } from "react-native";
import { API_WS_UPDATES_URL } from "../api/constants";
import { useStore } from "../store";

export const UpdateContext = createContext();

export const UpdateProvider = ({ children }) => {
  const { getUser, setNotifications } = useStore();
  const { token } = getUser();

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const { coords } = location ?? {};
    return coords ?? {};
  };

  const sendPushNotification = async (notification) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: notification.title,
        body: notification.subject,
        data: {},
      },
      trigger: null,
    });
  };

  useEffect(() => {
    if (token) {
      const ws = new WebSocket(`${API_WS_UPDATES_URL}?token=${token}`);

      ws.onopen = async () => {
        const { latitude, longitude } = await getLocation();
        ws.send(
          JSON.stringify({
            lat: latitude,
            lng: longitude,
          })
        );
        setInterval(async () => {
          const { latitude, longitude } = await getLocation();
          ws.send({
            lat: latitude,
            lng: longitude,
          });
        }, 300000);
      };

      ws.onmessage = (e) => {
        const res = JSON.parse(e.data);

        if (res.notification) {
          const notification = res.notification;

          // Notifications.postLocalNotification({
          //   title: notification.title,
          //   body: `${notification.subject} - ${notification.description}`,
          //   extra: JSON.stringify(notification),
          // });

          console.log(notification);

          setNotifications({
            ...notification,
            read_flag: false,
          });

          if (Platform.OS === "ios") {
            sendPushNotification(notification);
          }
        }
      };

      ws.onerror = (e) => {
        console.log(`WEB SOCKET ERROR ${e.message}`);
      };
    }
  }, [token]);

  return <UpdateContext.Provider>{children}</UpdateContext.Provider>;
};
