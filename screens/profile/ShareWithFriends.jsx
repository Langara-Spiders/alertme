import { Button, Pressable, Text, View } from "@gluestack-ui/themed";
import { Alert, Share, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FormattedMessage } from "react-intl";
import SvgUri from "react-native-svg-uri";
import ShareIcon from "../../assets/icons/Profile/Share.svg";
import Back_Icon from "../../assets/icons/System_Icons/ArrowLeft.svg";

const ShareWithFriends = () => {
  const navigation = useNavigation();

  const onShare = async () => {
    try {
      const result = await Share.share({
        dialogTitle: "Share AlertMe with friends",
        message: "Check out AlertMe at https://about.alertme.tech/",
        url: "https://about.alertme.tech/",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          Alert.alert("Shared with activity type: " + result.activityType);
        } else {
          Alert.alert("Content shared!");
        }
      } else if (result.action === Share.dismissedAction) {
        Alert.alert("Sharing dismissed");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.navigate("Profile")}
          style={styles.iconContainer}
        >
          <SvgUri
            width="24"
            height="24"
            source={Back_Icon}
            style={styles.icon}
          />
        </Pressable>
        <Text style={styles.headerText}>
          <FormattedMessage
            id="ShareWithFriends.headerText"
            defaultMessage="Share With Friends"
          />
        </Text>
      </View>
      <Button onPress={onShare} style={styles.textContainer}>
        <SvgUri source={ShareIcon} width={24} height={24} style={styles.icon} />
        <Text style={styles.textLang}>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: "#F3F4F4",
    opacity: 0.8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    paddingLeft: 10,
  },
  icon: {
    width: 24,
    height: 24,
    textAlign: "center",
  },
  headerText: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    height: 70,
    backgroundColor: "#F3F4F4",
    borderRadius: 10,
  },
  textLang: {
    fontSize: 18,
  },
  icon: {
    marginRight: 10,
  },
});
