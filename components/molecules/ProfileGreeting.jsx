import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Text,
  View,
} from "@gluestack-ui/themed";

import { FormattedMessage } from "react-intl";
import { StyleSheet } from "react-native";

const ProfileGreeting = (props) => {
  const { name, avatar } = props;

  return (
    <View style={styles.mainContainer}>
      <Avatar>
        {avatar ? (
          <AvatarImage source={{ uri: avatar }} />
        ) : (
          <AvatarFallbackText style={styles.text}>
            {name.charAt(0)}
          </AvatarFallbackText>
        )}
      </Avatar>
      <Text style={styles.text}>
        <FormattedMessage
          id="greeting.profile"
          defaultMessage={`{name}`}
          values={{ name }}
        />
      </Text>
    </View>
  );
};

export default ProfileGreeting;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  text: {
    color: "black",
    textAlign: "center",
  },
});
