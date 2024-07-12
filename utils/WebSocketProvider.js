import * as Location from "expo-location";
import React, { createContext, useRef, useState } from "react";
import { Alert } from "react-native";
import useStore from "../store/useStore";

export const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const { id } = useStore.getState().getUser(); // Fetch user ID from Zustand store
  const WEBSOCKET_URL = `ws://35.85.118.12:8000/api/notifications/?user_id=${id}`;
  const [notifications, setNotifications] = useState([]);
  const ws = useRef(null);

  const initializeWebSocket = async () => {
    ws.current = new WebSocket(WEBSOCKET_URL);

    ws.current.onopen = async () => {
      console.log("WebSocket is connected.");
      const location = await getLocation();
      if (location) {
        sendCoordinates(location.latitude, location.longitude);
      }

      // Send coordinates every 5 seconds
      setInterval(async () => {
        const location = await getLocation();
        if (location) {
          sendCoordinates(location.latitude, location.longitude);
        }
      }, 5000);
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received data:", data);
      setNotifications(data.data); // Replace the state with the new notification list
    };

    ws.current.onerror = (error) => {
      console.log("WebSocket error:", error.message);
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed. Reconnecting...");
      setTimeout(initializeWebSocket, 5000); // Reconnect after 5 seconds
    };
  };

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return null;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      return { latitude, longitude };
    } catch (error) {
      console.error("Error getting location:", error);
      return null;
    }
  };

  const sendCoordinates = (latitude, longitude) => {
    const coordinates = { latitude, longitude };
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(coordinates));
    }
  };

  // Initialize the WebSocket connection
  initializeWebSocket();

  return (
    <WebSocketContext.Provider value={{ notifications }}>
      {children}
    </WebSocketContext.Provider>
  );
};
