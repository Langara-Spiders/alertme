import { Text, View } from "@gluestack-ui/themed";

import { FormattedMessage } from "react-intl";
import { StyleSheet } from "react-native";
import SelectUserType from "./Signup/SelectUserType";

const About = () => {
  return (
    <View style={styles.container}>
      <Text>
        <FormattedMessage id="About.title.message" defaultMessage="About Us" />
      </Text>
      <SelectUserType />
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#fff",
  },
});
