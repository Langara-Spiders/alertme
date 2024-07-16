import { ScrollView, View } from "@gluestack-ui/themed";

import { StyleSheet } from "react-native";

import { NearbyIncidentCard } from "../components/molecules";
import { DateTime } from "../utils";

const NearByActiveIssues = ({ route }) => {
  const { incidents } = route.params;

  return (
    <ScrollView style={styles.container}>
      {incidents.map((incident, index) => {
        const { date, time } = DateTime(incident.created_at);
        return (
          <View key={index} style={styles.cardContainer}>
            <NearbyIncidentCard {...incident} />
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
    backgroundColor: "white",
  },
  cardContainer: {
    marginBottom: 10,
  },
});

export default NearByActiveIssues;
