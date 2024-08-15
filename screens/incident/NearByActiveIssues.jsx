import { Pressable, ScrollView, Text, View } from "@gluestack-ui/themed";

import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import BackIcon from "../../assets/icons/common_icons/arrow_left.png";
import { IncidentCard } from "../../components/molecules";
import { DateTime } from "../../utils";

const NearByActiveIssues = ({ route }) => {
  const { incidents } = route.params;
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "white",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingBottom: 10,
      paddingTop: 10,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: "#F3F4F4",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 10,
    },
    icon: {
      width: 24,
      height: 24,
    },
    headerText: {
      fontSize: 18,
      fontWeight: "bold",
    },
    cardContainer: {
      marginBottom: 10,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.navigate("Home")}
          style={styles.iconContainer}
        >
          <Image source={BackIcon} style={styles.icon} />
        </Pressable>
        <Text style={styles.headerText}>Nearby Active Issues</Text>
      </View>
      {incidents.map((incident, index) => {
        const { date, time } = DateTime(incident.created_at);
        return (
          <View key={index} style={styles.cardContainer}>
            <IncidentCard {...incident} />
          </View>
        );
      })}
    </ScrollView>
  );
};

export default NearByActiveIssues;
