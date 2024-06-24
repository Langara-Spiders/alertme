import { Text, View } from "@gluestack-ui/themed";
import { FormattedMessage } from "react-intl";
import { StyleSheet } from "react-native";

import LoginAsCard from "../components/molecules/cards/LoginAsCard";

const ChooseUser = () => {
  return (
    <View style={styles.content}>
      <Text style={styles.header}>
        <FormattedMessage
          id="ChooseUser.help"
          defaultMessage="Help us to know you better!"
        />
      </Text>
      <Text style={styles.text}>
        <FormattedMessage
          id="ChooseUser.begin"
          defaultMessage="Please select the user type to begin with"
        />
      </Text>
      <View>
        <LoginAsCard userType="civilian" />
        <LoginAsCard userType="Construction Worker" />
      </View>
    </View>
  );
};

export default ChooseUser;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFF",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    marginBottom: 20,
    addingTop: 5,
  },
});
