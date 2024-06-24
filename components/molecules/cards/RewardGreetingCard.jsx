import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  View,
} from "@gluestack-ui/themed";
import { FormattedMessage, useIntl } from "react-intl";
import { StyleSheet } from "react-native";
import Typography from "../../atoms/Typography";

/* This component displays a greeting card with the user's name,
subtitle, and avatar. If the avatar is not provided,
it falls back to displaying the first letter of the user's name. */
const RewardsGreetingCard = (props) => {
  const intl = useIntl();
  const name = props.name || "";

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Typography style={styles.greetingText}>
          <FormattedMessage
            id="RewardsGreetingCard.greeting"
            defaultMessage="Hello 😎"
          />
          {props.name}!
        </Typography>
        <Typography style={styles.subtitleText}>
          <FormattedMessage
            id="RewardsGreetingCard.roadhero"
            defaultMessage="You're a road hero 😎"
          />
        </Typography>
      </View>

      <Avatar style={styles.avatar}>
        {props.avatar ? (
          <AvatarImage
            source={props.avatar}
            style={styles.avatarImage}
            alt="greeting avatar"
          />
        ) : (
          <AvatarFallbackText style={styles.avatarFallbackText}>
            {props.name.charAt(0)}
          </AvatarFallbackText>
        )}
      </Avatar>
    </View>
  );
};

export default RewardsGreetingCard;

/* Styles for the RewardsGreetingCard component including the container,
 text container, greeting text, subtitle text, and avatar styles. */
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    height: 100,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  greetingText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subtitleText: {
    fontSize: 14,
    marginTop: 10,
  },
  avatar: {
    width: 100,
    height: "100%",
    // alignSelf: "stretch",
    borderRadius: 10,
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
