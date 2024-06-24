import { FormattedMessage } from "react-intl";
import { Image, StyleSheet, Text, View } from "react-native";

const UpVoteCard = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {props.votes}
        <FormattedMessage
          id="Upvote.card"
          defaultMessage=" Users upvoted this Issue"
        />
      </Text>
      <Image
        style={styles.avatar}
        source={{
          uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
        }}
        alt="avatar image"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: 344,
    height: 52,
    padding: 10,
    paddingLeft: 16,
    paddingRight: 8,
    justifyContent: "center",
    gap: 100,
    backgroundColor: "#F3F4F4",
    borderRadius: 8,
  },
  text: {
    marginRight: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 25,
  },
});

export default UpVoteCard;
