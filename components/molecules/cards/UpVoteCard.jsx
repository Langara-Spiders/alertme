import { FormattedMessage } from "react-intl";
import { Image, StyleSheet, Text, View } from "react-native";

const UpVoteCard = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.icon}>🔺</Text>
        <Text style={styles.text}>
          {props.votes}
          <FormattedMessage
            id="Upvote.card"
            defaultMessage=" Users upvoted this Issue"
          />
        </Text>
      </View>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{
            uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
          }}
          alt="avatar image"
        />
        <Image
          style={styles.avatar}
          source={{
            uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
          }}
          alt="avatar image"
        />
        <Image
          style={styles.avatar}
          source={{
            uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
          }}
          alt="avatar image"
        />
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
    marginLeft: -10, // To overlap the images
  },
  icon: {
    width: 16,
    height: 16,
  },
});

export default UpVoteCard;
