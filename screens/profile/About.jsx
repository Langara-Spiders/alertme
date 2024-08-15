import { Pressable, Text, View } from "@gluestack-ui/themed";
import { Image, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { FormattedMessage } from "react-intl";
import BackIcon from "../../assets/icons/common_icons/arrow_left.png";

const About = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.navigate("Profile")}
          style={styles.iconContainer}
        >
          <Image source={BackIcon} style={styles.icon} />
        </Pressable>
        <Text style={styles.headerText}>
          <FormattedMessage
            id="profile.About.headerText"
            defaultMessage="About"
          />
        </Text>
      </View>
      <View style={styles.content}>
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
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: "#F3F4F4",
    opacity: 0.8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  icon: {
    width: 24,
    height: 24,
    textAlign: "center",
  },
  headerText: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    padding: 40,
  },
});
