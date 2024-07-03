import * as Sharing from "expo-sharing";

import { Button, Text, View } from "@gluestack-ui/themed";
import { Alert, StyleSheet } from "react-native";

import React from "react";
import { FormattedMessage } from "react-intl";
import SvgUri from "react-native-svg-uri";
import Share from "../assets/icons/Profile/Share.svg";

const ShareWithFriends = () => {
  const onShare = async () => {
    try {
      const result = await Sharing.shareAsync(null, {
        dialogTitle: "Share AlertMe",
        message: "Check out AlertMe at https://alertme.tech!",
        url: "https://alertme.tech",
      });

      if (result.action === Sharing.sharedAction) {
        if (result.activityType) {
          Alert.alert("Shared with activity type: " + result.activityType);
        } else {
          Alert.alert("Content shared!");
        }
      } else if (result.action === Sharing.dismissedAction) {
        Alert.alert("Sharing dismissed");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Button onPress={onShare} style={styles.textConatiner}>
        <SvgUri source={Share} width={24} height={24} style={styles.icon} />
        <Text>
          <FormattedMessage
            id="ShareWithFriends.shareButtonText"
            defaultMessage="Share With Friends"
          />
        </Text>
      </Button>
    </View>
  );
};

export default ShareWithFriends;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    paddingTop: 40,
  },
  textConatiner: {
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    gap: 10,
    height: 70,
    backgroundColor: "#F3F4F4",
    borderRadius: 10,
  },
});
