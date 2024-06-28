import { Text, View } from "@gluestack-ui/themed";
import { StyleSheet, TouchableOpacity } from "react-native";

import { FormattedMessage } from "react-intl";

const UpvoteButton = (props) => {
  return (
    <TouchableOpacity
      style={[styles.button, props.style]}
      onPress={props.onPress}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.text}>
          <FormattedMessage
            id="atom.upvotebuttontext"
            defaultMessage="🔺 Upvote "
          />
          {props.upvote}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default UpvoteButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 50,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
