import { Image, StyleSheet, Text, View } from "react-native";

import { FormattedMessage } from "react-intl";
import Upvot_Only_arrow from "../../../assets/icons/upvote_arrow.png";
import { useStore } from "../../../store";

const UpVoteCard = (props) => {
  const { palette } = useStore();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      width: 344, // Set a fixed width
      height: 52,
      padding: 10,
      justifyContent: "space-between",
      backgroundColor: palette.backButtonBg,
      borderRadius: 8,
    },
    textContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    text: {
      marginLeft: 5,
    },
    avatarContainer: {
      flexDirection: "row",
    },
    avatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
      marginLeft: -10,
    },
    icon: {
      width: 16,
      height: 16,
      marginBottom: 2,
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Image source={Upvot_Only_arrow} style={styles.icon} />
        <Text style={styles.text}>
          {props.upVotes}
          <FormattedMessage
            id="Upvote.card"
            defaultMessage=" Users upvoted this Issue"
          />
        </Text>
      </View>
      <View style={styles.avatarContainer}>
        {props.voters.slice(0, 3).map((voter, index) => (
          <Image
            key={index}
            style={styles.avatar}
            source={{ uri: voter.picture }}
            alt="avatar image"
          />
        ))}
      </View>
    </View>
  );
};

export default UpVoteCard;
