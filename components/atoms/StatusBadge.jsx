import { Text, View } from "@gluestack-ui/themed";

import { FormattedMessage } from "react-intl";
import { StyleSheet } from "react-native";

const StatusBadge = (props) => {
  let backgroundColor, textColor, txt;

  if (props.status.toLowerCase() === "active") {
    backgroundColor = "#FECACA";
    textColor = "#7E1E1C";
    txt = <FormattedMessage id="badgeS.active" defaultMessage="Active" />;
  } else if (props.status.toLowerCase() === "resolved") {
    backgroundColor = "#A7F1A3";
    textColor = "#185215";
    txt = <FormattedMessage id="badgeS.resolved" defaultMessage="Resolved" />;
  } else if (props.status.toLowerCase() === "fixing") {
    backgroundColor = "#FFBF40";
    textColor = "#462F00";
    txt = <FormattedMessage id="badgeS.fixing" defaultMessage="Fixing" />;
  } else if (props.status.toLowerCase() === "pending") {
    backgroundColor = "#FFBF40";
    textColor = "#0B0C0C";
    txt = <FormattedMessage id="badgeS.pending" defaultMessage="Pending" />;
  } else if (props.status.toLowerCase() === "rejected") {
    backgroundColor = "gray";
    textColor = "#0B0C0C";
    txt = <FormattedMessage id="badgeS.rejected" defaultMessage="Rejected" />;
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
      <Text style={styles.text}>{txt}</Text>
    </View>
  );
};

export default StatusBadge;
