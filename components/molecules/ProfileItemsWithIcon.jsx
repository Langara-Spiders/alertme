import { ArrowRightIcon, Text, View } from "@gluestack-ui/themed";

import { FormattedMessage } from "react-intl";
import { StyleSheet } from "react-native";
import SvgUri from "react-native-svg-uri";

const ProfileItemsWithIcon = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.textIcon}>
        <SvgUri width="30" height="30" source={props.icon} />
        <Text style={styles.text}>
          <FormattedMessage
            id={props.messageId}
            defaultMessage={props.defaultMessage}
          />
        </Text>
      </View>
      <ArrowRightIcon onPress={props.onPress} />
    </View>
  );
};

export default ProfileItemsWithIcon;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
  textIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 10,
  },
});
