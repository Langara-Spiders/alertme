import { Text, View } from "@gluestack-ui/themed";
import { FormattedMessage } from "react-intl";
import { StyleSheet } from "react-native";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        <FormattedMessage
          id="splash.layout"
          defaultMessage="An Instant community safety mobile application"
        />
      </Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF6B00",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  text: {
    color: "#000",
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
});
