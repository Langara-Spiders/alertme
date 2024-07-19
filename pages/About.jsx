import { Text, View } from "@gluestack-ui/themed";

import { FormattedMessage } from "react-intl";
import { StyleSheet } from "react-native";

const About = () => {
  return (
    <View style={styles.container}>
      <Text>
        <FormattedMessage
          id="About.title.message"
          defaultMessage="
            AlertMe is a
            community driven app
            developed by team Spiders v1.0.0"
        />
      </Text>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: "#fff",
  },
});
