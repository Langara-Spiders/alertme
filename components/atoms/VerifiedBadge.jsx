import { Text, View } from "@gluestack-ui/themed";
import { FormattedMessage } from "react-intl";
import { StyleSheet } from "react-native";
import SvgUri from "react-native-svg-uri";
import Verified from "../../assets/icons/map_markers/verf_hazard_icon.svg";

const VerifiedBadge = () => {
  return (
    <View style={styles.card}>
      <SvgUri width="14" height="14" source={Verified} style={styles.icon} />
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
    height: 24,
    padding: 4,
    paddingHorizontal: 8,
    alignItems: "center",
    gap: 4,
    borderRadius: 100,
    backgroundColor: "#E6E7E8",
    flexDirection: "row",
  },
  icon: {
    width: 14,
    height: 14,
  },
  text: {
    color: "#0B0C0C",
    fontFamily: "Public Sans",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 15.6, // 130% of 12px
  },
});
