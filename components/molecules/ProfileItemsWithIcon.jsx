import {
  AddIcon,
  ArrowRightIcon,
  Icon,
  Text,
  View,
} from "@gluestack-ui/themed";

import { StyleSheet } from "react-native";

const ProfileItemsWithIcon = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.textIcon}>
        <Icon as={props.icon ?? AddIcon} />
        <Text style={styles.text}>{props.text}</Text>
      </View>
      <ArrowRightIcon />
    </View>
  );
};

export default ProfileItemsWithIcon;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  textIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 10,
  },
});
