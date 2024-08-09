import { Pressable, Text, View } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FormattedMessage } from "react-intl";
import { Alert, Share, StyleSheet, TouchableOpacity } from "react-native";
import SvgUri from "react-native-svg-uri";
import ShareIcon from "../../assets/icons/Profile/Share.svg";
import Back_Icon from "../../assets/icons/System_Icons/ArrowLeft.svg";

const ShareWithFriends = () => {
  const navigation = useNavigation();

  const onShare = async () => {
    try {
      const result = await Share.share({
        dialogTitle: "Share AlertMe with friends",
        message: "Check out AlertMe at https://alertme.tech/",
        url: "https://alertme.tech/",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          Alert.alert("Shared with activity type: " + result.activityType);
        } else {
          Alert.alert("Content shared!");
        }
      }
      // else if (result.action === Share.dismissedAction) {
      //   Alert.alert("Sharing dismissed");
      // }
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
      <TouchableOpacity onPress={onShare} style={styles.textContainer}>
        <SvgUri source={ShareIcon} width={24} height={24} style={styles.icon} />
        <Text style={styles.textLang}>
          <FormattedMessage
            id="ShareWithFriends.shareButtonText"
            defaultMessage="Share with friend"
          />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShareWithFriends;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
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
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  icon: {
    width: 24,
    height: 24,
    textAlign: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#F7F7F7",
    marginTop: 20,
  },
  textLang: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "500",
  },
});
