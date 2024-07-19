import { ScrollView, Text, View } from "@gluestack-ui/themed";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { FormattedMessage } from "react-intl";
import { NotificationCard } from "../components/molecules";
import { routes } from "../constants";
import { useStore } from "../store";
import timeAgo from "../utils/timeAgo";

const Notifications = (props) => {
  const { getNotifications, setNotifications } = useStore();
  const notifications = getNotifications();

  const [activeButton, setActiveButton] = useState("all");
  const navigation = useNavigation();

  const handleButtonPress = (buttonType) => {
    setActiveButton(buttonType);
  };

  const filteredNotifications =
    notifications?.filter((notification) => {
      if (activeButton === "all") {
        return true;
      }
      if (activeButton === "read") {
        return notification.read_flag; // Use read_flag based on your data structure
      }
      if (activeButton === "unread") {
        return !notification.read_flag; // Use read_flag based on your data structure
      }
    }) || [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[
            styles.button,
            activeButton === "all"
              ? styles.activeButton
              : styles.inactiveButton,
          ]}
          onPress={() => handleButtonPress("all")}
        >
          <Text
            style={[
              styles.buttonText,
              activeButton === "all"
                ? styles.activeButtonText
                : styles.inactiveButtonText,
            ]}
          >
            <FormattedMessage id="notifications.button1" defaultMessage="All" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            activeButton === "unread"
              ? styles.activeButton
              : styles.inactiveButton,
          ]}
          onPress={() => handleButtonPress("unread")}
        >
          <Text
            style={[
              styles.buttonText,
              activeButton === "unread"
                ? styles.activeButtonText
                : styles.inactiveButtonText,
            ]}
          >
            <FormattedMessage
              id="notifications.button3"
              defaultMessage="Unread"
            />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            activeButton === "read"
              ? styles.activeButton
              : styles.inactiveButton,
          ]}
          onPress={() => handleButtonPress("read")}
        >
          <Text
            style={[
              styles.buttonText,
              activeButton === "read"
                ? styles.activeButtonText
                : styles.inactiveButtonText,
            ]}
          >
            <FormattedMessage
              id="notifications.button2"
              defaultMessage="Read"
            />
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {filteredNotifications.map((notification) => (
          <TouchableOpacity
            style={{ width: "100%" }}
            onPress={() => {
              setNotifications({
                ...notification,
                read_flag: true,
              });

              navigation.navigate(routes.INCIDENT_DETAIL, {
                incident_id: notification.incident_id,
              });
            }}
          >
            <NotificationCard
              key={notification.id}
              title={notification.title}
              description={notification.description}
              timeAgo={timeAgo(notification.created_at)}
              read={notification.read_flag}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ffffff",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  activeButton: {
    backgroundColor: "#ff6600",
  },
  inactiveButton: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ff6600",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  activeButtonText: {
    color: "#ffffff",
  },
  inactiveButtonText: {
    color: "#ff6600",
  },
  scrollView: {
    alignItems: "center",
    paddingBottom: 20,
    marginTop: 25,
  },
});
