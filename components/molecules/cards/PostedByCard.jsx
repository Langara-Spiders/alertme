import { Heading, HStack, Image, Text, VStack } from "@gluestack-ui/themed";
import { StyleSheet, View } from "react-native";

const PostedByCard = (props) => {
  return (
    <View style={styles.container}>
      <HStack space="md" style={styles.hStack}>
        <Image
          style={styles.avatar}
          source={{
            uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
          }}
          alt="avatar image"
        />
        <VStack style={styles.vStack}>
          <Heading size="sm" style={styles.name}>
            {props.name}
          </Heading>
          <Text size="sm" style={styles.date}>
            {new Date(props.created_at).toLocaleString()}
          </Text>
        </VStack>
      </HStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  hStack: {
    alignItems: "center",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  vStack: {
    marginLeft: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "#636C6E",
  },
});

export default PostedByCard;
