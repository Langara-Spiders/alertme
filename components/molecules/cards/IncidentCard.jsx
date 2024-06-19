import { Card, Heading, Image, View } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
import { Button } from "../../atoms/buttons/Button";
import { UpvoteButton } from "../../atoms/buttons/UpvoteButton";
import { Typography } from "../../atoms/Typography";

const IncidentCard = (props) => {
  return (
    <Card style={styles.card}>
      <Button style={styles.statusButton}>{props.status}</Button>
      <Image source={props.image} style={styles.image} />
      <Heading style={styles.title}>{props.title}</Heading>
      <View style={styles.infoContainer}>
        <Typography style={styles.location}>{props.location}</Typography>
        <UpvoteButton style={styles.upvoteButton}>{props.upvote}</UpvoteButton>
      </View>
      <Typography style={styles.date}>{props.date}</Typography>
      <Typography style={styles.time}>{props.time}</Typography>
    </Card>
  );
};

export default IncidentCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1E1E1E",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  statusButton: {
    backgroundColor: "#FF9900",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: "#FFF",
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  location: {
    fontSize: 14,
    color: "#FFF",
  },
  upvoteButton: {
    backgroundColor: "#FF9900",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: "#FFF",
    fontWeight: "bold",
  },
  date: {
    fontSize: 12,
    color: "#FFF",
    marginBottom: 5,
  },
  time: {
    fontSize: 12,
    color: "#FFF",
  },
});
