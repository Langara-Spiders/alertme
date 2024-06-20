import { ArrowRightIcon, Icon, Text } from "@gluestack-ui/themed";
import { StyleSheet, View } from "react-native";

import React from "react";
import { FormattedMessage } from "react-intl";

const ProfileItemsWithIcon = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.textIcon}>
        <Icon as={props.icon} />
        <Text style={styles.text}>
          <FormattedMessage
            id="profile.items"
            defaultMessage="{text}"
            values={{ text: props.text }}
          />
        </Text>
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
