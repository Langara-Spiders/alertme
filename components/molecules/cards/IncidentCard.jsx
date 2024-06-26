import {
  Card,
  Heading,
  Image,
  Pressable,
  Text,
  View,
} from "@gluestack-ui/themed";
import { StatusBadge, UpvoteButton } from "../../atoms";

import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { routes } from "../../../constants";

const dateOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
};

const IncidentCard = (props) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(routes.INCIDENT_DETAIL, { incident: props });
  };

  return (
    <Pressable onPress={handlePress}>
      <Card style={styles.card}>
        <View style={styles.infoContainer}>
          <View style={styles.statusContainer}>
            <StatusBadge status={props.status} />
          </View>
          <Heading style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {props.subject}
          </Heading>
          <Text
            style={styles.description}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {props.description}
          </Text>
          <View style={styles.footer}>
            <View style={styles.locationContainer}>
              <Text style={styles.locationIcon}>📍</Text>
              <Text
                style={styles.locationText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {props.streetAddress}
              </Text>
            </View>
            <Text style={styles.timeText}>
              {new Date(props.created_at).toLocaleString("en-US", dateOptions)}
            </Text>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: props.image ?? "https://picsum.photos/200/300" }}
            style={styles.image}
            alt="image"
          />
          <UpvoteButton upvote={props.upvote_count} />
        </View>
      </Card>
    </Pressable>
  );
};

export default IncidentCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoContainer: {
    flex: 1,
    marginRight: 10,
  },
  statusContainer: {
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  statusText: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  active: {
    backgroundColor: "#ff6600",
  },
  pending: {
    backgroundColor: "#ffcc00",
  },
  resolved: {
    backgroundColor: "#00cc00",
  },
  fixing: {
    backgroundColor: "#ff9900",
  },
  title: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    color: "#808080",
    fontSize: 16,
    marginBottom: 5,
  },
  footer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: 10,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  locationIcon: {
    fontSize: 16,
    color: "#ff6600",
  },
  locationText: {
    color: "#ff6600",
    fontSize: 14,
    marginLeft: 5,
  },
  timeText: {
    color: "#808080",
    fontSize: 12,
  },
  imageContainer: {
    alignItems: "center",
    marginLeft: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginBottom: 10,
  },
});
