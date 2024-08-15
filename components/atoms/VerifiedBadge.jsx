import { Text, View } from "@gluestack-ui/themed";
import { Image, StyleSheet } from "react-native";

import { FormattedMessage } from "react-intl";
import Verified from "../../assets/icons/map_markers/verf_hazard_icon.png";
import { useStore } from "../../store";

const VerifiedBadge = () => {
  const { palette } = useStore();

  const styles = StyleSheet.create({
    card: {
      display: "flex",
      paddingTop: 4,
      paddingBottom: 4,
      paddingHorizontal: 8,
      borderRadius: 100,
      backgroundColor: palette.badgeBg,
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
      color: palette.txt1,
      fontSize: 12,
      fontStyle: "normal",
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.card}>
      <Image
        style={{ width: 16, height: 16 }}
        source={Verified}
        style={styles.icon}
      />
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
