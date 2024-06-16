import { Avatar, AvatarFallbackText, AvatarImage, Card, VStack } from "@gluestack-ui/themed";
import { StyleSheet, View } from "react-native";

import React from "react";
import Typography from "../../../atoms/Typography";

const LeaderBoardCard = (props) => {
  return (
    <Card style={styles.card}>
      <View style={styles.leftContainer}>
        <Avatar style={styles.avatar}>
          <AvatarImage source={props.avatar} style={styles.avatarImage} />
          <AvatarFallbackText style={styles.avatarFallbackText}>{props.name.charAt(0)}</AvatarFallbackText>
        </Avatar>
        <VStack style={styles.textContainer}>
          <Typography style={styles.nameText} size="sm">{props.name}</Typography>
          <Typography style={styles.levelText} size="sm">Level {props.level}</Typography>
        </VStack>
      </View>
      <Typography style={styles.points}>{props.points}</Typography>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF9900',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarFallbackText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
  textContainer: {
    marginLeft: 10,
  },
  nameText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  levelText: {
    color: '#FFF',
    fontSize: 14,
  },
  points: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LeaderBoardCard;
