import { Card, Heading, Image, Text, View } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
import { StatusBadge, UpvoteButton } from "../../atoms";

const IncidentCard = (props) => {
  return (
    <Card style={styles.card}>
      <View style={styles.infoContainer}>
        <View style={styles.statusContainer}>
          <StatusBadge status={props.status} />
        </View>
        <Heading style={styles.title}>{props.subject}</Heading>
        <Text style={styles.description} numberOfLines={1} ellipsizeMode="tail">
          {props.description}
        </Text>
        <View style={styles.footer}>
          <View style={styles.locationContainer}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.locationText}>121, 51A Main Street</Text>
          </View>
          <Text style={styles.timeText}>
            {new Date(props.created_at).toLocaleString()}
          </Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: props.image ?? "https://picsum.photos/200/300" }}
          style={styles.image}
          alt="image"
        />
        <UpvoteButton style={styles.upvoteButton} upvote={props.upvote_count} />
      </View>
    </Card>
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
  upvoteButton: {
    flexDirection: "row",
    alignItems: "center",
  },
});
