import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Card,
  View,
  VStack,
} from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
import Typography from "../../atoms/Typography";

/* This component displays an individual leaderboard card
 with user details including avatar, name, level, and points. */
const LeaderBoardCard = (props) => {
  return (
    <Card style={styles.card}>
      <View style={styles.leftContainer}>
        <Avatar style={styles.avatar}>
          <AvatarImage
            source={props.avatar}
            style={styles.avatarImage}
            alt="Avatar Image"
          />
          <AvatarFallbackText style={styles.avatarFallbackText}>
            {props.name.charAt(0)}
          </AvatarFallbackText>
        </Avatar>
        <VStack style={styles.textContainer}>
          <Typography style={styles.nameText} size="sm">
            {props.name}
          </Typography>
          <Typography style={styles.levelText} size="sm">
            Level {props.level}
          </Typography>
        </VStack>
      </View>
      <Typography style={styles.points}>{props.points}</Typography>
    </Card>
  );
};

export default LeaderBoardCard;

/* Styles for the LeaderBoardCard component including the card layout,
 avatar, text container, and points display. */
const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF9900",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  avatarFallbackText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
  },
  textContainer: {
    marginLeft: 10,
  },
  nameText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  levelText: {
    color: "black",
    fontSize: 14,
  },
  points: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});
