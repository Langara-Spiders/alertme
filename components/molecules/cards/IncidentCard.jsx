import {
  Card,
  Heading,
  Image,
  Pressable,
  Text,
  View,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import SvgUri from "react-native-svg-uri";
import Location_Spot from "../../../assets/icons/System_Icons/Location_spot.svg";
import { routes } from "../../../constants";
import useStore from "../../../store/useStore";
import { StatusBadge } from "../../atoms";
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
  const { id, name, isStaff } = useStore.getState().getUser();
  const current_logged_in_user_id = id;

  const handlePress = () => {
    const targetRoute = isStaff
      ? routes.INCIDENT_DETAIL_ORG
      : routes.INCIDENT_DETAIL;
    navigation.navigate(targetRoute, { incident_id: props.id });
  };

  return (
    <Pressable onPress={handlePress}>
      <Card style={styles.card}>
        <View style={styles.infoContainer}>
          <View style={styles.statusContainer}>
            <StatusBadge status={props.status} />
          </View>
          <Heading style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {props.subject ?? "No Subject"}
          </Heading>
          <Heading
            style={styles.distance}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {props.distance
              ? `${props.distance.toFixed(1)} km away`
              : "Distance unavailable"}
          </Heading>
          <View style={styles.locationContainer}>
            <SvgUri width="16" height="16" source={Location_Spot} />
            <Text
              style={styles.locationText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {props.address?.street_address ?? "Address unavailable"}
            </Text>
          </View>
          <View style={styles.footer}>
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
    display: "flex",
    padding: 12,
    alignItems: "center",
    gap: 16,
    alignSelf: "stretch",
    borderRadius: 8,
    backgroundColor: "#F3F4F4",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    height: 166,
  },
  infoContainer: {
    flex: 1,
    marginRight: 10,
  },
  statusContainer: {
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  title: {
    alignSelf: "stretch",
    color: "#0B0C0C",
    fontFamily: "Public Sans",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 0,
  },
  distance: {
    color: "#0B0C0C",
    fontFamily: "Public Sans",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 0,
    marginBottom: 16,
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 12,
    flex: 1,
    alignSelf: "stretch",
  },
  locationContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 20,
  },
  locationText: {
    color: "black",
    fontSize: 14,
    marginLeft: 5,
  },
  timeText: {
    flex: 1,
    color: "#919A9C",
    fontFamily: "Public Sans",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "400",
    marginTop: 4,
  },
  imageContainer: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  image: {
    display: "flex",
    width: 56,
    height: 56,
    flexShrink: 0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 60,
  },
  upvote: {
    marginTop: 60,
  },
  verified: {
    marginTop: 60,
  },
});
