import { FormattedMessage } from "react-intl";
import { Image, StyleSheet, Text, View } from "react-native";
import SvgUri from "react-native-svg-uri";
import Upvot_Only_arrow from "../../../assets/icons/System_Icons/Upvot_Only_arrow.svg";

const UpVoteCard = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <SvgUri
          width="18"
          height="18"
          source={Upvot_Only_arrow}
          style={styles.icon}
        />
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 10,
    justifyContent: "space-between",
    backgroundColor: "#F3F4F4",
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
    width: 12,
    height: 16,
    marginBottom: 2,
  },
});

export default UpVoteCard;
