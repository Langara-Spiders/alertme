import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  View,
} from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
import Typography from "../../atoms/Typography";

const RewardsGreetingCard = (props) => {
  const name = props.name || '';

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Typography style={styles.greetingText}>Hello {props.name}!</Typography>
        <Typography style={styles.subtitleText}>
          You're a road hero 😎
        </Typography>
      </View>

      <Avatar style={styles.avatar}>
        <AvatarImage source={props.avatar} style={styles.avatarImage} />
        <AvatarFallbackText style={styles.avatarFallbackText}>
          {props.name.charAt(0)}
        </AvatarFallbackText>
      </Avatar>
    </View>
  );
};

export default RewardsGreetingCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    marginBottom: 15,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  subtitleText: {
    fontSize: 14,
    color: "#FFF",
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
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 20,
  },
});
