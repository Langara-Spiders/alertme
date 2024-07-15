import { Card, Text, View } from "@gluestack-ui/themed";

import { FormattedMessage } from "react-intl";
import { StyleSheet } from "react-native";
import { SwitchButton } from "../../atoms";

const SwitchIconCard = (props) => {
  const toggleSwitch = () => {
    props.setValue(!props.value);
  };

  const getTitleAndDescription = (type) => {
    switch (type) {
      case "Location":
        return {
          title: (
            <FormattedMessage
              id="SwitchCard.title.location"
              defaultMessage="Location"
            />
          ),
          description: (
            <FormattedMessage
              id="SwitchCard.description.location"
              defaultMessage="To send you location-based alerts and notifications."
            />
          ),
        };
      case "Notification":
        return {
          title: (
            <FormattedMessage
              id="SwitchCard.title.notification"
              defaultMessage="Notification"
            />
          ),
          description: (
            <FormattedMessage
              id="SwitchCard.description.notification"
              defaultMessage="To send you notifications and alerts."
            />
          ),
        };
      case "Camera":
        return {
          title: (
            <FormattedMessage
              id="SwitchCard.title.camera"
              defaultMessage="Camera"
            />
          ),
          description: (
            <FormattedMessage
              id="SwitchCard.description.camera"
              defaultMessage="To access your camera for taking photos and videos."
            />
          ),
        };
      default:
        return {
          title: "",
          description: "",
        };
    }
  };

  const { title, description } = getTitleAndDescription(props.type);

  return (
    <Card style={styles.card}>
      <View style={styles.textContainer}>
        <Text variant="h2" style={styles.title}>
          {title}
        </Text>
        <Text variant="body2" style={styles.description}>
          {description}
        </Text>
      </View>
      <SwitchButton
        value={props.value}
        onValueChange={toggleSwitch}
        trackColor={{ false: "#DBDDDE", true: "#FF6B00" }}
        style={styles.switch}
      />
    </Card>
  );
};

export default SwitchIconCard;

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#F3F4F4",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    // color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  description: {
    fontSize: 14,
  },
  switch: {
    marginLeft: 10,
  },
});
