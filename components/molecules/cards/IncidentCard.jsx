import {
  Card,
  Heading,
  Image,
  Pressable,
  Text,
  View,
} from "@gluestack-ui/themed";
import { StatusBadge } from "../../atoms";

import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import SvgUri from "react-native-svg-uri";
import Location_Spot from "../../../assets/icons/System_Icons/Location_Spot.svg";
import { routes } from "../../../constants";
import { UpVotedBadge, VerifiedBadge } from "../../atoms/";

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
    navigation.navigate(routes.INCIDENT_DETAIL, { incident_id: props.id });
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
          <Heading
            style={styles.distance}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {props.distance.toFixed(1)} km away
          </Heading>
          <View style={styles.footer}>
            <View style={styles.locationContainer}>
              <SvgUri width="16" height="16" source={Location_Spot} />
              <Text
                style={styles.locationText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {props.address.street_address}
              </Text>
            </View>
            <Text style={styles.timeText}>
              {new Date(props.created_at).toLocaleString("en-US", dateOptions)}
            </Text>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: props.images[0] ?? "https://picsum.photos/200/300" }}
            style={styles.image}
            alt="image"
          />
          {props.reported_by === "ORG" || props.is_accepted_by_org ? (
            <VerifiedBadge style={styles.verified} />
          ) : (
            <UpVotedBadge upvote={props.upvote_count} style={styles.upvote} />
          )}
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
    backgroundColor: "#F3F4F4",
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
    paddingBottom: 0,
    marginBottom: 0,
    lineHeight: 0,
    marginTop: 5,
  },
  distance: {
    color: "#000000",
    fontSize: 18,
    lineHeight: 0,
    paddingTop: 0,
    fontWeight: "bold",
    marginBottom: 0,
  },
  footer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: 10,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  locationIcon: {
    fontSize: 16,
    color: "#ff6600",
  },
  locationText: {
    color: "black",
    fontSize: 14,
    marginLeft: 5,
  },
  timeText: {
    color: "#808080",
    fontSize: 12,
    marginTop: 5,
  },
  imageContainer: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginBottom: 40,
  },
  upvote: {
    marginTop: 40,
  },
  verified: {
    marginTop: 40,
  },
});
