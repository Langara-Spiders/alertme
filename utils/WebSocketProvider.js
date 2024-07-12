import * as Location from "expo-location";
import React, { createContext, useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import useStore from "../store/useStore";

export const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const { id } = useStore.getState().getUser(); // Fetch user ID from Zustand store
  const WEBSOCKET_URL = `ws://35.85.118.12:8000/api/notifications/?user_id=${id}`;
  const [notifications, setNotifications] = useState([]);
  const ws = useRef(null);

  const initializeWebSocket = () => {
    console.log("Initializing WebSocket connection...");

    ws.current = new WebSocket(WEBSOCKET_URL);

    ws.current.onopen = () => {
      console.log("WebSocket is connected.");
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received data:", data);
      if (data && data.data) {
        setNotifications(data.data); // Set notifications state
      } else {
        console.log("Unexpected data structure:", data);
      }
    };

    ws.current.onerror = (error) => {
      console.log("WebSocket error:", error.message);
    };

    ws.current.onclose = (e) => {
      console.log("WebSocket connection closed. Reconnecting...", e.reason);
      setTimeout(initializeWebSocket, 25000); // Reconnect after 5 seconds
    };
  };

  useEffect(() => {
    initializeWebSocket();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  useEffect(() => {
    const sendLocationData = async () => {
      const location = await getLocation();
      if (location) {
        sendCoordinates(location.latitude, location.longitude);
      }
    };

    sendLocationData(); // Send initial location data

    const intervalId = setInterval(sendLocationData, 10000); // Send location data every 10 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

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
      console.log("Sent coordinates:", coordinates);
    } else {
      console.log("WebSocket is not open. Cannot send coordinates.");
    }
  };

  return (
    <WebSocketContext.Provider value={{ notifications }}>
      {children}
    </WebSocketContext.Provider>
  );
};
