import { Text, View } from "@gluestack-ui/themed";
import { FormattedMessage } from "react-intl";
import { StyleSheet, TouchableOpacity } from "react-native";

const UpvoteButton = (props) => {
  console.log("UPVOTE BUTTON");
  return (
    <TouchableOpacity
      style={[styles.button, props.style]}
      onPress={props.onPress}
    >
      {console.log("Button is pressed")}
      <View style={styles.iconContainer}>
        <Text style={styles.text}>
          <FormattedMessage
            id="atom.upvotebuttontext"
            defaultMessage="Upvote Issue"
          />
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default UpvoteButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6600",
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
