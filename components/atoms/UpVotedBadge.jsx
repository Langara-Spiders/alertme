import { Text, View } from "@gluestack-ui/themed";
import { FormattedMessage } from "react-intl";
import { StyleSheet } from "react-native";
import SvgUri from "react-native-svg-uri";
import Upvot_Only_arrow from "../../assets/icons/System_Icons/Upvot_Only_arrow.svg";

const UpVotedBadge = (props) => {
  return (
    <View style={styles.card}>
      <SvgUri
        width="22"
        height="22"
        source={Upvot_Only_arrow}
        style={styles.icon}
      />
      <Text style={styles.text}>
        <FormattedMessage
          id="atom.upvotebuttontext"
          defaultMessage="Upvoted "
        />
        {props.upvote}
      </Text>
    </View>
  );
};

export default UpVotedBadge;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 1,
    paddingHorizontal: 4,
    borderRadius: 25,
    borderColor: "#333",
    backgroundColor: "#DBDDDE",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
});
