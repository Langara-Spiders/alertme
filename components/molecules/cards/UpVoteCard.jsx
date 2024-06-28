import { Image, StyleSheet, Text, View } from "react-native";

import { FormattedMessage } from "react-intl";

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
            uri: "https://place-hold.it/300",
          }}
          alt="avatar image"
        />
        <Image
          style={styles.avatar}
          source={{
            uri: "https://place-hold.it/300",
          }}
          alt="avatar image"
        />
        <Image
          style={styles.avatar}
          source={{
            uri: "https://place-hold.it/300",
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
