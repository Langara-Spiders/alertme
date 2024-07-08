import { Text, View } from "@gluestack-ui/themed";
import { StyleSheet, TouchableOpacity } from "react-native";

const UpvoteButton = (props) => {
  console.log("UPVOTE BUTTON");
  console.log(props);
  return (
    <TouchableOpacity
      style={[styles.button, styles.disabledButton]}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      {console.log("Button is pressed")}
      <View style={styles.iconContainer}>
        <Text style={styles.text}>{props.buttonText}</Text>
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
  disabledButton: {
    backgroundColor: "#FFA07A",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
