import { ArrowRightIcon, Text, View } from "@gluestack-ui/themed";

import { StyleSheet } from "react-native";
import SvgUri from "react-native-svg-uri";

const ProfileItemsWithIcon = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.textIcon}>
        <SvgUri width="30" height="30" source={props.icon} />
        <Text style={styles.text}>{props.text}</Text>
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
