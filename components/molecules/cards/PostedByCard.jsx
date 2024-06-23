import { Heading, HStack, Image, Text, VStack } from "@gluestack-ui/themed";
import { StyleSheet, View } from "react-native";

const PostedByCard = (props) => {
  return (
    <View>
      <HStack space="md">
        <Image
          style={styles.avatar}
          source={{
            uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
          }}
          alt="avatar image"
        />
        <VStack>
          <Heading size="sm">{props.name}</Heading>
          <Text size="sm">
            {props.date} at {props.time}
          </Text>
        </VStack>
      </HStack>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 48,
  },
});

export default PostedByCard;
