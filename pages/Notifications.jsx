import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { NotificationCard } from "../components/molecules";

const notifications = [
  {
    notification: "You have a new message!",
    timeAgo: "2 minutes ago",
  },
  {
    notification: "Your order has been shipped.",
    timeAgo: "1 hour ago",
  },
];

const Notifications = (props) => {
  const { navigation } = props;

  return (
    <ScrollView>
      {notifications.map((notificationItem, index) => (
        <NotificationCard
          key={index}
          notification={notificationItem.notification}
          timeAgo={notificationItem.timeAgo}
        />
      ))}
    </ScrollView>
  );
};

export default Notifications;

const styles = StyleSheet.create({});
