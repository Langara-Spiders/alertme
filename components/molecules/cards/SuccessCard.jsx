import { Text, View } from "@gluestack-ui/themed";
import { Image, StyleSheet } from "react-native";

import successIcon from "../../../assets/icons/SuccessFill.png";
import upVoteIcon from "../../../assets/icons/upvote_arrow.png";

const SuccessCard = ({ type }) => {
  let heading = "";
  let message = "";

  if (type === "post") {
    icon = <Image style={{ width: 24, height: 24 }} source={successIcon} />;
    heading = "Issue Posted Successfully";
    message =
      "Your incident posts to the map after 3 upvotes 🔼 or employee review and post!";
  } else if (type === "confirm") {
    icon = <Image style={{ width: 24, height: 24 }} source={upVoteIcon} />;
    heading = "You have upvoted an Incident";
    message =
      "Thank you for your response. We will update you on the incident status soon.";
  } else if (type === "approve") {
    icon = <Image style={{ width: 24, height: 24 }} source={successIcon} />;
    heading = "You have approved Incident ";
    message =
      "Thank you for your response. We will post this incident on map to inform others";
  } else if (type === "reject") {
    icon = <Image style={{ width: 24, height: 24 }} source={successIcon} />;
    heading = "You have rejected an Incident";
    message = "Thank you for your response. We will update status in the app.";
  } else if (type === "resolve") {
    icon = <Image style={{ width: 24, height: 24 }} source={successIcon} />;
    heading = "You have resolved an Incident";
    message = "Thank you for your response. We will update status in the app.";
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {icon}
        <Text style={styles.heading}>{heading}</Text>
      </View>
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  heading: {
    fontSize: 16,
    color: "#0B0C0C",
    fontWeight: 600,
    marginLeft: 5,
    marginBottom: 0,
  },
  message: {
    marginTop: 12,
    fontSize: 14,
    color: "#0B0C0C",
  },
});
