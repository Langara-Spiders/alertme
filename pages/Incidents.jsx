import {
  ArrowLeftIcon,
  FlatList,
  Icon,
  Pressable,
  ScrollView,
  Text,
  View,
} from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";

import { getMyIssues } from "../api/incident";
import { IncidentCard } from "../components/molecules";

const screenWidth = Dimensions.get("window").width;

const Incidents = (props) => {
  const { navigation } = props;
  const [activeButton, setActiveButton] = useState("all");
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    fetchIncidents();
    const interval = setInterval(fetchIncidents, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchIncidents = async () => {
    const data = await getMyIssues();
    if (Array.isArray(data)) {
      setIncidents(data);
    } else {
      console.error("Data is not an array:", data);
    }
  };

  const renderItem = ({ item }) => (
    <IncidentCard
      subject={item.subject}
      description={item.description}
      upvote_count={item.upvote_count}
      status={item.status}
      created_at={item.created_at}
      image={item.image}
      streetAddress={item.address.address_line1}
      distance={item.distance}
      incident_category_name={item.incident_category_name}
      reported_by={item.reported_by}
      isStaff={item.isStaff}
      user_id={item.user_id}
      is_accepted_by_org={item.is_accepted_by_org}
      user_name={item.user_name}
      coordinate={item.coordinate}
    />
  );

  const ItemSeparator = () => <View style={styles.separator} />;

  const handleButtonPress = (buttonType) => {
    setActiveButton(buttonType);
  };

  const filteredIncidents = Array.isArray(incidents)
    ? incidents.filter((incident) => {
        if (activeButton === "all") {
          return true;
        }
        return incident.status.toLowerCase() === activeButton;
      })
    : [];

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate("Home")}>
          <Icon as={ArrowLeftIcon} />
        </Pressable>
        <Text style={styles.headerText}>My Posted Issues</Text>
      </View>
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {["all", "active", "pending", "resolved", "fixing"].map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.button,
                activeButton === status
                  ? styles.activeButton
                  : styles.inactiveButton,
              ]}
              onPress={() => handleButtonPress(status)}
            >
              <Text
                style={[
                  styles.buttonText,
                  activeButton === status
                    ? styles.activeButtonText
                    : styles.inactiveButtonText,
                ]}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        <FlatList
          data={filteredIncidents}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={ItemSeparator}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
};

export default Incidents;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  headerText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  filterContainer: {
    paddingVertical: 10,
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    width: (screenWidth - 10) / 5,
  },
  activeButton: {
    backgroundColor: "#ff6600",
  },
  inactiveButton: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ff6600",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  activeButtonText: {
    color: "#ffffff",
  },
  inactiveButtonText: {
    color: "#ff6600",
  },
  separator: {
    height: 10,
  },
  listContainer: {
    paddingTop: 10,
  },
});
