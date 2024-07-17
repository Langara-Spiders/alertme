import React, { createContext, useEffect } from "react";

import { Notifications } from "react-native-notifications";
import { API_WS_UPDATES_URL } from "../api/constants";
import { useStore } from "../store";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { getUser, setNotifications } = useStore();
  const { token } = getUser();

  const handleOpenNotification = (notification) => {
    console.log("Handling notification in context:", notification);
  };

  // Notifications.events().registerNotificationOpened(
  //   handleOpenNotification
  // );

  useEffect(() => {
    if (token) {
      console.log(token, "Token");
      const ws = new WebSocket(`${API_WS_UPDATES_URL}?token=${token}`);

      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            lat: 49.22,
            lng: -123.1,
          })
        );
      };

      ws.onmessage = (e) => {
        const res = JSON.parse(e.data);

        if (res.notification) {
          const notification = res.notification;

          Notifications.postLocalNotification({
            title: notification.title,
            body: `${notification.subject} - ${notification.description}`,
            extra: JSON.stringify(notification),
          });

          setNotifications({
            ...notification,
            read_flag: false,
          });
        }
      };

      ws.onerror = (e) => {
        console.log(`WEB SOCKET ERROR ${e.message}`);
      };
    }
  }, [token]);

  return (
    <NotificationContext.Provider value={{ handleOpenNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
