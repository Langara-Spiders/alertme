import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Card,
  View,
  VStack,
} from "@gluestack-ui/themed";

import { StyleSheet } from "react-native";
import { useStore } from "../../../store";
import Typography from "../../atoms/Typography";

const LeaderBoardCard = (props) => {
  const { palette } = useStore();

  const styles = StyleSheet.create({
    card: {
      backgroundColor: palette.bg4,
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
      backgroundColor: palette.primary1,
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
      color: palette.txt1,
      fontSize: 16,
      fontWeight: "bold",
    },
    levelText: {
      color: palette.txt1,
      fontSize: 14,
    },
    points: {
      color: palette.txt1,
      fontSize: 18,
      fontWeight: "bold",
    },
  });

  return (
    <Card style={styles.card}>
      <View style={styles.leftContainer}>
        <Avatar style={styles.avatar}>
          {props.avatar ? (
            <AvatarImage
              source={props.avatar}
              style={styles.avatarImage}
              alt="Avatar Image"
            />
          ) : (
            <AvatarFallbackText style={styles.avatarFallbackText}>
              {props.name.charAt(0)}
            </AvatarFallbackText>
          )}
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
