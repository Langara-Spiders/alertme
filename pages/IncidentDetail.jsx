import { Image, Text, View } from "@gluestack-ui/themed";

import { StyleSheet } from "react-native";
import { StatusBadge } from "../components/atoms";
import { PostedByCard } from "../components/molecules";
import UpVoteCard from "../components/molecules/cards/UpVoteCard";

const INCIDENT_DETAIL = ({ route }) => {
  const { incident } = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: incident.image }}
        style={styles.image}
        alt="incident Image"
      />
      <View style={styles.detailsContainer}>
        <StatusBadge status={incident.status} />
        <Text style={styles.title}>{incident.title}</Text>
        <Text style={styles.title}>{incident.location}</Text>
        <Text style={styles.heading}>Incident Location</Text>
        <Text>121,51A MainStreet,</Text>
        <Text style={styles.heading}>Incident Type</Text>
        <Text>Oil Spilled on Road</Text>
        <Text>{incident.description}</Text>
        <Text>nkdnknsdknknskdnkcnknsknkndsknkfnkndfknd</Text>
        <Text style={styles.heading}>Posted by</Text>
        <PostedByCard
          name="Karthik"
          date={incident.date}
          time={incident.time}
        />
        <UpVoteCard votes={incident.votes} />
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
