import { Text, View } from "@gluestack-ui/themed";

import { FormattedMessage } from "react-intl";
import { StyleSheet } from "react-native";
import SvgUri from "react-native-svg-uri";
import Verified from "../../assets/icons/map_markers/verf_hazard_icon.svg";

const VerifiedBadge = () => {
  return (
    <View style={styles.card}>
      <SvgUri width="16" height="16" source={Verified} style={styles.icon} />
      <Text style={styles.text}>
        <FormattedMessage
          id="atom.verifiedbuttontext"
          defaultMessage="Verified Issue"
        />
      </Text>
    </View>
  );
};

export default VerifiedBadge;

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
    width: 16,
    height: 16,
    alignSelf: "center",
  },
  text: {
    color: "#0B0C0C",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "bold",
  },
});
