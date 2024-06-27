import { ArrowRightIcon, Button, Text, View } from "@gluestack-ui/themed";

import { StyleSheet } from "react-native";
import SvgUri from "react-native-svg-uri";

const ProfileItemsWithIcon = (props) => {
  return (
    <Button style={styles.container} onPress={props.onPress}>
      <View style={styles.textIcon}>
        <SvgUri width="30" height="30" source={props.icon} />
        <Text style={styles.text}>{props.text}</Text>
      </View>
      <ArrowRightIcon />
    </Button>
  );
};

export default ProfileItemsWithIcon;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  textIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 10,
  },
});
