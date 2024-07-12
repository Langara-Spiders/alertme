import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Text,
  View,
} from "@gluestack-ui/themed";
import React from "react";
import { StyleSheet } from "react-native";
import SvgUri from "react-native-svg-uri";

const TopThreeCard = ({ rank, name, level, avatar, banner }) => {
  const firstName = name.split(" ")[0]; // Extract the first name

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {rank === 1 && (
          <SvgUri
            source={require("../../../assets/icons/Reward_screen/Reward_Crown.svg")}
            style={styles.crown}
          />
        )}
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
        {banner && <SvgUri source={banner} style={styles.banner} />}
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {firstName}
      </Text>
      <Text style={styles.level}>Level {level}</Text>
    </View>
  );
};

export default TopThreeCard;

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
    left: 9,
    zIndex: 1, // Ensure crown is above the avatar
  },
  banner: {
    width: 70, // Adjust the width as per your SVG dimensions
    height: 20, // Adjust the height as per your SVG dimensions
    position: "absolute",
    bottom: -10, // Adjust this value to overlap the avatar
    left: 3,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E1E1E",
    marginTop: 20,
    textAlign: "center",
    maxWidth: 150,
    flexWrap: "wrap",
  },
  level: {
    fontSize: 14,
    color: "#1E1E1E",
    marginTop: 2,
  },
});
