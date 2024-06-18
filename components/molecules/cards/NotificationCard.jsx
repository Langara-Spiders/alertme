import { Text, View } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";

const NotificationCard = ({ notification, timeAgo }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.notificationText}>{notification}</Text>
      <Text style={styles.timeText}>{timeAgo}</Text>
    </View>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: "#212121",
    padding: 15,
    margin: 10,
  },
  notificationText: {
    color: "#ffffff",
    fontSize: 16,
    marginBottom: 5,
  },
  timeText: {
    color: "#b0b0b0",
    fontSize: 14,
  },
});
