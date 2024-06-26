import { ScrollView, View } from "@gluestack-ui/themed";

import { StyleSheet } from "react-native";
import { IncidentCard } from "../components/molecules";
import { DateTime } from "../utils";

const NearByActiveIssues = ({ route }) => {
  const { incidents } = route.params;

  return (
    <ScrollView style={styles.container}>
      {incidents.map((incident, index) => {
        const { date, time } = DateTime(incident.created_at);
        return (
          <View key={index} style={styles.cardContainer}>
            <IncidentCard
              status={incident.status}
              title={incident.subject}
              description={incident.description}
              location={incident.address}
              date={date}
              time={time}
              upvote={incident.upvote_count}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  cardContainer: {
    marginBottom: 10,
  },
});

export default NearByActiveIssues;
