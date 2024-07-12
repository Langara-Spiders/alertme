import * as Location from "expo-location";
import React, { createContext, useEffect, useRef, useState } from "react";

const WEBSOCKET_URL =
  "ws://{{BASE_URL}}/api/notifications/?user_id=1b8d80e1-a1bd-4237-9902-c9564fe43ea4";

export const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    const connectWebSocket = () => {
      ws.current = new WebSocket(WEBSOCKET_URL);

      ws.current.onopen = async () => {
        console.log("WebSocket connection opened.");
        // Send initial location data
        const location = await getLocation();
        if (location) {
          ws.current.send(JSON.stringify(location));
        }
      };

      ws.current.onmessage = (event) => {
        const newNotification = JSON.parse(event.data);
        setNotifications((prevNotifications) => [
          newNotification,
          ...prevNotifications,
        ]);
      };

      ws.current.onerror = (error) => {
        console.log("WebSocket error:", error);
      };

      ws.current.onclose = () => {
        console.log("WebSocket connection closed. Reconnecting...");
        setTimeout(connectWebSocket, 1000); // Reconnect after 1 second
      };
    };

    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return null;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      return { lat: latitude, lng: longitude };
    };

    connectWebSocket();

    const locationInterval = setInterval(async () => {
      const location = await getLocation();
      if (location && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify(location));
      }
    }, 5000); // Send location data every 5 seconds

    return () => {
      if (ws.current) {
        ws.current.close();
      }
      clearInterval(locationInterval);
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ notifications }}>
      {children}
    </WebSocketContext.Provider>
  );
};
