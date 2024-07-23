import * as Location from "expo-location";
import * as Notifications from "expo-notifications";

import React, { createContext, useEffect } from "react";

import { useNavigation } from "@react-navigation/native";
import { API_WS_UPDATES_URL } from "../api/constants";
import { routes } from "../constants";
import { useStore } from "../store";

export const UpdateContext = createContext();

export const UpdateProvider = ({ children }) => {
  const navigation = useNavigation();
  const { getUser, setNotifications } = useStore();
  const { token, isStaff } = getUser();

  useEffect(async () => {
    await Notifications.requestPermissionsAsync();
  }, []);

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
        body: `${notification.subject} - ${notification.description}`,
        data: notification,
      },
      trigger: null,
    });
  };

  // Onclick of push notification
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const data = response?.notification?.request?.content?.data ?? {};
        navigation.navigate(
          isStaff ? routes.INCIDENT_DETAIL_ORG : routes.INCIDENT_DETAIL,
          {
            incident_id: data.incident_id,
          }
        );
      }
    );
    return () => {
      subscription.remove();
    };
  }, []);

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
          setNotifications({
            ...notification,
            read_flag: false,
          });

          sendPushNotification(notification);
        }
      };

      ws.onerror = (e) => {
        console.log(`WEB SOCKET ERROR ${e.message}`);
      };
    }
  }, [token]);

  return <UpdateContext.Provider>{children}</UpdateContext.Provider>;
};
