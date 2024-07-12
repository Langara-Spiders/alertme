import { Text, View } from "@gluestack-ui/themed";

import { FormattedMessage } from "react-intl";
import { StyleSheet } from "react-native";
import SvgUri from "react-native-svg-uri";
import Upvot_Only_arrow from "../../assets/icons/System_Icons/Upvot_Only_arrow.svg";

const UpVotedBadge = (props) => {
  return (
    <View style={styles.card}>
      <SvgUri
        width="18"
        height="18"
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
    height: 32,
    paddingTop: 4,
    paddingBottom: 4,
    paddingHorizontal: 8,
    borderRadius: 100,
    backgroundColor: "#E6E7E8",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    fontWeight: "bold",
  },
  icon: {
    display: "flex",
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 2,
  },
  text: {
    color: "#0B0C0C",
    fontFamily: "Public Sans",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 15.6, // 130% of 12px
  },
});
