import { Text, View } from "@gluestack-ui/themed";

import { StyleSheet } from "react-native";

const StatusBadge = (props) => {
  let backgroundColor, textColor;

  if (props.status === "active" || props.status === "Active") {
    backgroundColor = "#FDA5A5";
    textColor = "#7E1E1C";
  } else if (props.status === "resolved" || props.status === "Resolved") {
    backgroundColor = "#88D384";
    textColor = "#185215";
  } else if (props.status === "fixing" || props.status === "Fixing") {
    backgroundColor = "#FFBF40";
    textColor = "#0B0C0C";
  } else if (props.status === "pending" || props.status === "Pending") {
    backgroundColor = "#FFBF40";
    textColor = "#0B0C0C";
  }

  const styles = StyleSheet.create({
    container: {
      alignSelf: "flex-start",
      backgroundColor,
      borderRadius: 20,
      paddingHorizontal: 10,
      paddingVertical: 2,
    },
    text: {
      color: textColor,
      fontSize: 12,
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.status}</Text>
    </View>
  );
};

export default StatusBadge;
