import { Pressable, Text, View } from "@gluestack-ui/themed";
import {
  Alert,
  Image,
  Share,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FormattedMessage } from "react-intl";
import BackIcon from "../../assets/icons/common_icons/arrow_left.png";
import ShareIcon from "../../assets/icons/share_icon.png";
import { useStore } from "../../store";

const ShareWithFriends = () => {
  const navigation = useNavigation();
  const { palette } = useStore();

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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.bg1,
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
      backgroundColor: palette.backButtonBg,
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
      color: palette.txt1,
    },
    textContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 15,
      borderRadius: 10,
      backgroundColor: palette.bg2,
      marginTop: 20,
    },
    textLang: {
      fontSize: 16,
      marginLeft: 10,
      fontWeight: "500",
      color: palette.txt1,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.navigate("Profile")}
          style={styles.iconContainer}
        >
          <Image source={BackIcon} style={styles.icon} />
        </Pressable>
        <Text style={styles.headerText}>
          <FormattedMessage
            id="ShareWithFriends.headerText"
            defaultMessage="Share With Friends"
          />
        </Text>
      </View>
      <TouchableOpacity onPress={onShare} style={styles.textContainer}>
        <Image
          style={{ width: 24, height: 24, tintColor: palette.txt1 }}
          source={ShareIcon}
        />
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
