import { Text, View } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";

const StatusBadge = (props) => {
  let backgroundColor, textColor;

  if (props.status.toLowerCase() === "active") {
    backgroundColor = "#FECACA";
    textColor = "#7E1E1C";
  } else if (props.status.toLowerCase() === "resolved") {
    backgroundColor = "#A7F1A3";
    textColor = "#185215";
  } else if (props.status.toLowerCase() === "fixing") {
    backgroundColor = "#FFBF40";
    textColor = "#462F00";
  } else if (props.status.toLowerCase() === "pending") {
    backgroundColor = "#FFBF40";
    textColor = "#0B0C0C";
  } else if (props.status.toLowerCase() === "rejected") {
    backgroundColor = "gray";
    textColor = "#0B0C0C";
  }

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      paddingHorizontal: 11,
      paddingVertical: 2,
      alignItems: "center",
      gap: 4,
      alignSelf: "flex-start",
      backgroundColor,
      borderRadius: 20,
    },
    text: {
      color: textColor,
      fontFamily: "Public Sans",
      fontSize: 12,
      fontStyle: "normal",
      fontWeight: "600",
      lineHeight: 15.6, // 130% of 12px
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {props.status.charAt(0).toUpperCase() +
          props.status.slice(1).toLowerCase()}
      </Text>
    </View>
  );
};

export default StatusBadge;
