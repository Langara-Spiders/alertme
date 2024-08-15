import { Image, Pressable, ScrollView, Text, View } from "@gluestack-ui/themed";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { FormattedMessage } from "react-intl";
import BackIcon from "../../assets/icons/common_icons/arrow_left.png";
import { NotificationCard } from "../../components/molecules";
import { routes } from "../../constants";
import { useStore } from "../../store";
import { timeAgo } from "../../utils";

const Notifications = (props) => {
  const { getUser, getNotifications, setNotifications, palette } = useStore();
  const { isStaff } = getUser();
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.bg1,
      padding: 16,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: palette.bg2,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 10,
    },
    icon: {
      width: 24,
      height: 24,
      opacity: 0.5,
    },
    headerText: {
      fontSize: 18,
      fontWeight: "bold",
      color: palette.txt1,
    },
    button: {
      alignItems: "center",
      justifyContent: "center",
      width: 90,
      height: 32,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
      marginRight: 6,
    },
    filterContainer: {
      marginTop: 12,
    },
    activeButton: {
      backgroundColor: palette.primary2,
    },
    inactiveButton: {
      backgroundColor: palette.bg2,
      borderWidth: 1,
      borderColor: palette.bg2,
    },
    buttonText: {
      color: "#FFF",
      fontFamily: "Public Sans",
      fontSize: 12,
      fontStyle: "normal",
      fontWeight: "600",
      lineHeight: 14.4,
    },
    activeButtonText: {
      color: "#ffffff",
    },
    inactiveButtonText: {
      color: "#636C6E",
    },
    scrollView: {
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: 20,
      marginTop: 25,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.navigate("Home")}
          style={styles.iconContainer}
        >
          <Image source={BackIcon} style={styles.icon} />
        </Pressable>
        <Text style={styles.headerText}>Notifications</Text>
      </View>
      <View style={styles.filterContainer}>
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
              <FormattedMessage
                id="notifications.button1"
                defaultMessage="All"
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
        </View>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {filteredNotifications.map((notificationItem, index) => (
            <TouchableOpacity
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                setNotifications({
                  ...notificationItem,
                  read_flag: true,
                });
                navigation.navigate(
                  isStaff ? routes.INCIDENT_DETAIL_ORG : routes.INCIDENT_DETAIL,
                  {
                    incident_id: notificationItem.incident_id,
                  }
                );
              }}
            >
              <NotificationCard
                key={notificationItem.incident_id}
                title={notificationItem.title}
                description={`${notificationItem.subject}${notificationItem.description ? " - " : ""}${notificationItem.description}`}
                timeAgo={timeAgo(notificationItem.created_at)}
                read={notificationItem.read_flag}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Notifications;
