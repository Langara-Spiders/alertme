import {
  Avatar,
  AvatarFallbackText,
  Heading,
  HStack,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { StyleSheet, View } from "react-native";

const dateOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
};

const PostedByCard = (props) => {
  return (
    <View style={styles.container}>
      <HStack space="md" style={styles.hStack}>
        <Avatar style={styles.avatar}>
          <AvatarFallbackText style={styles.avatarFallbackText}>
            {props.name.charAt(0)}
          </AvatarFallbackText>
        </Avatar>
        <VStack style={styles.vStack}>
          <Heading size="sm" style={styles.name}>
            {props.name}
          </Heading>
          <Text size="sm" style={styles.date}>
            {new Date(props.created_at).toLocaleString("en-Us", dateOptions)}
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
