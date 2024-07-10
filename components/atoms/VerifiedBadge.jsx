import { Text, View } from "@gluestack-ui/themed";

import { FormattedMessage } from "react-intl";
import { StyleSheet } from "react-native";
import SvgUri from "react-native-svg-uri";
import Verified from "../../assets/icons/map_markers/verf_hazard_icon.svg";

const VerifiedBadge = () => {
  return (
    <View style={styles.card}>
      <SvgUri width="18" height="18" source={Verified} style={styles.icon} />
      <Text style={styles.text}>
        <FormattedMessage
          id="atom.upvotebuttontext"
          defaultMessage="Verified Issue "
        />
      </Text>
    </View>
  );
};

export default VerifiedBadge;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
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
