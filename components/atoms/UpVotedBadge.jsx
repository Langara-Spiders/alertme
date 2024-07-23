import { Text, View } from "@gluestack-ui/themed";

import { FormattedMessage } from "react-intl";
import { StyleSheet } from "react-native";
import SvgUri from "react-native-svg-uri";
import Upvot_Only_arrow from "../../assets/icons/System_Icons/Upvot_Only_arrow.svg";

const UpVotedBadge = (props) => {
  return (
    <View style={styles.card}>
      <SvgUri
        width="16"
        height="16"
        source={Upvot_Only_arrow}
        style={styles.icon}
      />
      <Text style={styles.text}>
        <FormattedMessage
          id="atom.upvotebuttontext"
          defaultMessage="Upvoted • "
        />
        {props.upvote}
      </Text>
    </View>
  );
};

export default UpVotedBadge;

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    gap: 4,
    borderRadius: 100,
    backgroundColor: "#E6E7E8",
    flexDirection: "row",
    fontWeight: "bold",
    justifyContent: "center",
  },
  icon: {
    display: "flex",
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 2,
  },
  text: {
    color: "#0B0C0C",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "bold",
  },
});
