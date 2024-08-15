import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Text,
  View,
} from "@gluestack-ui/themed";
import { Image, StyleSheet } from "react-native";

import React from "react";
import CrownIcon from "../../../assets/icons/reward_icons/crown_icon.png";
import { useStore } from "../../../store";

const TopThreeCard = ({ rank, name, level, avatar, banner }) => {
  const firstName = name.split(" ")[0]; // Extract the first name
  const { palette } = useStore();

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      marginHorizontal: -10,
      marginRight: 20,
      marginLeft: 20,
    },
    avatarContainer: {
      position: "relative",
      alignItems: "center",
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginBottom: 5,
    },
    avatarImage: {
      width: "100%",
      height: "100%",
    },
    avatarFallbackText: {
      color: "#FFF",
      fontWeight: "bold",
      fontSize: 20,
    },
    crown: {
      width: 30, // Adjust the width as per your SVG dimensions
      height: 30, // Adjust the height as per your SVG dimensions
      position: "absolute",
      top: -21, // Adjust this value to position the crown above the avatar
      left: 15,
      zIndex: 1, // Ensure crown is above the avatar
    },
    banner: {
      width: 50, // Adjust the width as per your SVG dimensions
      height: 20, // Adjust the height as per your SVG dimensions
      position: "absolute",
      bottom: -10, // Adjust this value to overlap the avatar
      left: 3,
      zIndex: 999,
    },
    name: {
      fontSize: 16,
      fontWeight: "bold",
      color: palette.txt1,
      marginTop: 20,
      textAlign: "center",
      maxWidth: 150,
      flexWrap: "wrap",
    },
    level: {
      fontSize: 14,
      color: palette.txt1,
      marginTop: 2,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {rank === 1 && <Image source={CrownIcon} style={styles.crown} />}
        <Avatar style={styles.avatar}>
          {avatar ? (
            <AvatarImage
              source={{ uri: avatar }}
              style={styles.avatarImage}
              alt="top 3 board"
            />
          ) : (
            <AvatarFallbackText style={styles.avatarFallbackText}>
              {firstName.charAt(0)}
            </AvatarFallbackText>
          )}
        </Avatar>
        {banner && <Image source={banner} style={styles.banner} />}
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {firstName}
      </Text>
      <Text style={styles.level}>Level {level}</Text>
    </View>
  );
};

export default TopThreeCard;
