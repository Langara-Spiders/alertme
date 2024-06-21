import {
  AddIcon,
  Card,
  Heading,
  Icon,
  Image,
  Text,
  View,
} from "@gluestack-ui/themed";
import { Button, Typography, UpvoteButton } from "../../atoms";

import { StyleSheet } from "react-native";

const IncidentCard = (props) => {
  return (
    <Card style={styles.card}>
      <Button style={styles.statusButton}>{props.status}</Button>
      <Image source={props.image} style={styles.image} alt="Incident Image" />
      <Heading style={styles.title}>{props.title}</Heading>
      <View style={styles.infoContainer}>
        <Heading style={styles.title}>{props.title}</Heading>
        <View style={styles.dateTime}>
          <Icon as={AddIcon} />
          <Text style={styles.location}>{props.location}</Text>
        </View>
        <View style={styles.dateTime}>
          <Text style={styles.date}>{props.date ?? "June 3 2024"},</Text>
          <Text style={styles.time}>{props.time}</Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: props.image ?? "https://picsum.photos/200/300" }}
          style={styles.image}
          alt="image"
        />
        <UpvoteButton style={styles.upvoteButton} upvote={props.upvote} />
      </View>
    </Card>
  );
};

export default IncidentCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "start",
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
  },
  infoContainer: {
    gap: 3,
  },
  image: {
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    setTextAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  dateTime: {
    flexDirection: "row",
    marginTop: 10,
    gap: 1,
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
});
