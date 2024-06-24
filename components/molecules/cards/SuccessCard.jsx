import { Text, View } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";

const SuccessCard = ({ type }) => {
  let heading = "";
  let message = "";

  if (type === "post") {
    heading = "Issue Posted Successfully";
    message =
      "Your incident posts to the map after 3 upvotes 🔼 or employee review and post!";
  } else if (type === "confirm") {
    heading = "You have upvoted an Incident";
    message =
      "Thank you for your response. We will update you on the incident status soon.";
  } else if (type === "approve") {
    heading = "You have approved Incident ";
    message =
      "Thank you for your response. We will post this incident on map to inform others";
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

export default SuccessCard;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 4,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  heading: {
    fontSize: 16,
    color: "#0B0C0C",
    fontWeight: 600,
    marginBottom: 12,
  },
  message: {
    fontSize: 14,
    color: "#0B0C0C",
    textAlign: "center",
  },
});
