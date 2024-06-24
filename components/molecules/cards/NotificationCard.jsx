import { Text, View } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";

const NotificationCard = ({ title, description, timeAgo, read }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={read ? styles.dotRead : styles.dotUnread} />
        <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
      </View>
      <Text
        style={styles.descriptionText}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {description}
      </Text>
      <Text style={styles.timeText}>{timeAgo}</Text>
    </View>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: "#ffffff",
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    height: 120,
    width: "90%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  dotUnread: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ff6600",
    marginRight: 10,
  },
  dotRead: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#d3d3d3",
    marginRight: 10,
  },
  titleText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
  descriptionText: {
    color: "#000000",
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
  },
  timeText: {
    color: "#808080",
    fontSize: 14,
    marginTop: 5,
  },
});
