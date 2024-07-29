import { Text, View } from "@gluestack-ui/themed";

import { FormattedMessage } from "react-intl";
import { StyleSheet } from "react-native";

const StatusBadge = (props) => {
  let backgroundColor, textColor, label;

  if (props.status.toLowerCase() === "active") {
    label = (
      <FormattedMessage
        id="StatusBadge.status.active"
        defaultMessage="Active"
      />
    );
    backgroundColor = "#FECACA";
    textColor = "#7E1E1C";
  } else if (props.status.toLowerCase() === "resolved") {
    label = (
      <FormattedMessage
        id="StatusBadge.status.resolved"
        defaultMessage="Resolved"
      />
    );
    backgroundColor = "#A7F1A3";
    textColor = "#185215";
  } else if (props.status.toLowerCase() === "fixing") {
    label = (
      <FormattedMessage
        id="StatusBadge.status.fixing"
        defaultMessage="Fixing"
      />
    );
    backgroundColor = "#FFBF40";
    textColor = "#462F00";
  } else if (props.status.toLowerCase() === "pending") {
    label = (
      <FormattedMessage
        id="StatusBadge.status.pending"
        defaultMessage="Pending"
      />
    );
    backgroundColor = "#FFBF40";
    textColor = "#0B0C0C";
  } else if (props.status.toLowerCase() === "rejected") {
    label = (
      <FormattedMessage
        id="StatusBadge.status.rejected"
        defaultMessage="Rejected"
      />
    );
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
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

export default StatusBadge;
