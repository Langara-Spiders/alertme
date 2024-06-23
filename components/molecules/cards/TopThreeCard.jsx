import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Text,
  View,
} from "@gluestack-ui/themed";
import React from "react";
import { useIntl } from "react-intl";
import { StyleSheet } from "react-native";

const TopThreeCard = ({ rank, name, level, avatar }) => {
  const intl = useIntl();
  const rankStyles = {
    1: styles.firstPlace,
    2: styles.secondPlace,
    3: styles.thirdPlace,
  };

  const rankText = {
    1: "1st",
    2: "2nd",
    3: "3rd",
  };

  return (
    <View style={styles.container}>
      <Avatar style={styles.avatar}>
        {avatar ? (
          <AvatarImage
            source={avatar}
            style={styles.avatarImage}
            alt="top 3 board"
          />
        ) : (
          <AvatarFallbackText style={styles.avatarFallbackText}>
            {name.charAt(0)}
          </AvatarFallbackText>
        )}
      </Avatar>
      <Text style={[styles.rankText, rankStyles[rank]]}>{rankText[rank]}</Text>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.level}>Level {level}</Text>
    </View>
  );
};

export default TopThreeCard;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 10,
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
  rankText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  firstPlace: {
    color: "#FFD700",
  },
  secondPlace: {
    color: "#C0C0C0",
  },
  thirdPlace: {
    color: "#CD7F32",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E1E1E",
  },
  level: {
    fontSize: 14,
    color: "#1E1E1E",
  },
});
