import { Card, View } from "@gluestack-ui/themed";
import { FormattedMessage } from "react-intl";
import { StyleSheet } from "react-native";
import { SwitchButton } from "../../atoms";
import Typography from "../../atoms/Typography";

const SwitchIconCard = (props) => {
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
        <Typography variant="h2" style={styles.title}>
          {title}
        </Typography>
        <Typography variant="body2" style={styles.description}>
          {description}
        </Typography>
      </View>
      <SwitchButton style={styles.switch} />
    </Card>
  );
};

export default SwitchIconCard;

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#2a2a2a",
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
    color: "#fff",
    fontWeight: "bold",
  },
  description: {
    color: "#bbb",
  },
  switch: {
    marginLeft: 10,
  },
});
