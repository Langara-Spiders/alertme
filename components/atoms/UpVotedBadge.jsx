import { Text, View } from "@gluestack-ui/themed";
import { Image, StyleSheet } from "react-native";

import { FormattedMessage } from "react-intl";
import Upvot_Only_arrow from "../../assets/icons/upvote_arrow.png";
import { useStore } from "../../store";

const UpVotedBadge = (props) => {
  const { palette } = useStore();

  const styles = StyleSheet.create({
    card: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 4,
      paddingHorizontal: 8,
      gap: 4,
      borderRadius: 100,
      backgroundColor: palette.badgeBg,
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
      color: palette.txt1,
      fontSize: 12,
      fontStyle: "normal",
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.card}>
      <Image source={Upvot_Only_arrow} style={styles.icon} />
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
