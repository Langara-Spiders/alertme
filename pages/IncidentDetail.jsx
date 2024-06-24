import { Image, Text, View } from "@gluestack-ui/themed";

import { StyleSheet } from "react-native";
import { StatusBadge } from "../components/atoms";
import { PostedByCard } from "../components/molecules";
import UpVoteCard from "../components/molecules/cards/UpVoteCard";
import { DateTime } from "../utils";


const INCIDENT_DETAIL = ({ route }) => {
  const { incident } = route.params;
  const { date, time } = DateTime(incident.created_at);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: incident.image }}
        style={styles.image}
        alt="incident Image"
      />
      <View style={styles.detailsContainer}>
        <StatusBadge status={incident.status} />
        <Text style={styles.title}>{incident.subject}</Text>
        <Text style={styles.heading}>Incident Location</Text>
        <Text>{incident.address}</Text>
        <Text style={styles.heading}>Incident Type</Text>
        <Text>{incident.incident_category_name}</Text>
        <Text style={styles.heading}>Description</Text>
        <Text>{incident.description}</Text>
        <PostedByCard
          name={incident.user_reported}
          date={date}
          time={time}
        />
        <UpVoteCard votes={incident.upvote_count} />
      </View>
    </View>
  );
};

export default INCIDENT_DETAIL;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 3,
    width: "100%",
    height: "100%",
  },
  detailsContainer: {
    flex: 7,
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "white",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "black",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  heading: {
    color: "#636C6E",
    fontSize: 14,
    fontWeight: 400,
    paddingTop: 18,
    paddingBottom: 8,
  },
});
