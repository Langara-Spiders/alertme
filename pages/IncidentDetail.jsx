import { Image, Text, View } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
import { Button, StatusBadge } from "../components/atoms";
import { PostedByCard, UpVoteCard } from "../components/molecules";

import { DateTime } from "../utils";
import { FormattedMessage } from "react-intl";


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
        <PostedByCard name={incident.user_reported} date={date} time={time} />
        <UpVoteCard votes={incident.upvote_count} />
        {incident.reported_by === "USER" && (
          <Button>
            <Text>
              <FormattedMessage
                id="IncidentDetail.upvote"
                defaultMessage="Upvote Issue"
              />
            </Text>
          </Button>
        )}
        {incident.reported_by === "ORG" && incident.upvote_count < 3 && (
          <View style={styles.buttonContainer}>
            <Button>
              <Text>
                <FormattedMessage
                  id="IncidentDetail.reject"
                  defaultMessage="Reject"
                />
              </Text>
            </Button>
            <Button>
              <Text>
                <FormattedMessage
                  id="IncidentDetail.approve"
                  defaultMessage="Approve"
                />
              </Text>
            </Button>
          </View>
        )}
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
    fontWeight: "400",
    paddingTop: 18,
    paddingBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
