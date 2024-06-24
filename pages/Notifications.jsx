import { ScrollView, Text, View } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { StyleSheet, TouchableOpacity } from "react-native";
import { NotificationCard } from "../components/molecules";

const Notifications = (props) => {
  const sampleData = [
    {
      title: "You have upvoted an incident",
      description:
        "You have upvoted 'oil spilled on main street' incident post",
      timeAgo: "5 minutes ago",
      read: true,
    },
    {
      title: "New incident in your area",
      description:
        "There is a new incident 'traffic light malfunction at 5th Avenue'. Upvote if you see it.",
      timeAgo: "10 minutes ago",
      read: false,
    },
    {
      title: "You have upvoted an incident",
      description:
        "You have upvoted 'road closure due to flooding' incident post",
      timeAgo: "15 minutes ago",
      read: true,
    },
    {
      title: "Your incident got upvoted",
      description:
        "Your incident report 'broken street lamp at Oak Street' got upvoted",
      timeAgo: "30 minutes ago",
      read: false,
    },
    {
      title: "Incident reported near you",
      description:
        "A new incident 'water main break on Pine Street' was reported near you.",
      timeAgo: "45 minutes ago",
      read: true,
    },
    {
      title: "New incident alert",
      description:
        "Alert: New incident 'graffiti on city hall'. Upvote if you see it.",
      timeAgo: "3 hours ago",
      read: false,
    },
    {
      title: "Incident reported",
      description: "New incident reported: 'illegal dumping at River Park'.",
      timeAgo: "5 hours ago",
      read: true,
    },
    {
      title: "Your incident got upvoted",
      description:
        "Your incident report 'broken water fountain in Central Park' got upvoted",
      timeAgo: "6 hours ago",
      read: false,
    },
    {
      title: "Your incident was resolved",
      description:
        "Your incident report 'broken bench in Green Park' was resolved.",
      timeAgo: "11 hours ago",
      read: true,
    },
    {
      title: "Incident upvoted by others",
      description:
        "The incident 'illegal dumping at River Park' has been upvoted by others.",
      timeAgo: "14 hours ago",
      read: false,
    },
  ];

  const [notifications, setNotifications] = useState([]);
  const [activeButton, setActiveButton] = useState("all");

  useEffect(() => {
    setNotifications(sampleData);
  }, []);

  const handleButtonPress = (buttonType) => {
    setActiveButton(buttonType);
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (activeButton === "all") {
      return true;
    }
    if (activeButton === "read") {
      return notification.read;
    }
    if (activeButton === "unread") {
      return !notification.read;
    }
  });

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
          <NotificationCard
            key={index}
            title={notificationItem.title}
            description={notificationItem.description}
            timeAgo={notificationItem.timeAgo}
            read={notificationItem.read}
          />
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
