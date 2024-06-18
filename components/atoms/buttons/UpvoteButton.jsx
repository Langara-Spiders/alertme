import { ButtonIcon, ChevronUpIcon } from "@gluestack-ui/themed";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const UpvoteButton = ({ upvotes, onPress }) => {
  return (
    <TouchableOpacity style={upvoteButtonDefaultStyle.button} onPress={onPress}>
      <View style={upvoteButtonDefaultStyle.iconContainer}>
        <ButtonIcon as={ChevronUpIcon}></ButtonIcon>
        <Text style={upvoteButtonDefaultStyle.text}>Upvotes {upvotes} </Text>
      </View>
    </TouchableOpacity>
  );
};

export default UpvoteButton;

const upvoteButtonDefaultStyle = StyleSheet.create({
  button: {
    backgroundColor: "#FF9900",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "#FFF",
    fontWeight: "bold",
    marginLeft: 5,
  },
});
