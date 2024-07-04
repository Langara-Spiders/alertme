import {
  ArrowLeftIcon,
  FlatList,
  Icon,
  Pressable,
  ScrollView,
  Text,
  View,
} from "@gluestack-ui/themed";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { getAllIssuesforOrg } from "../api/incident";
import { IncidentCard } from "../components/molecules";

const screenWidth = Dimensions.get("window").width;

const AllIncidentsOrg = (props) => {
  const { navigation } = props;
  const [activeButton, setActiveButton] = useState("all");
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    getAllIssues();
    // handleRecenter();
    const interval = setInterval(() => {
      getAllIssues();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const { coords } = location ?? {};
    return coords ?? {};
  };

  const getAllIssues = async () => {
    const { latitude, longitude } = await getLocation();
    const response = await getAllIssuesforOrg(latitude, longitude);
    const incidentsWithDistance = response ?? [];

    // Sort incidents by distance
    incidentsWithDistance.sort((a, b) => a.distance - b.distance);

    setIncidents(incidentsWithDistance);
  };

  console.log("I guess this is incidents");
  console.log(incidents);

  const renderItem = ({ item }) => <IncidentCard {...item} />;

  const ItemSeparator = () => <View style={styles.separator} />;

  const handleButtonPress = (buttonType) => {
    setActiveButton(buttonType);
  };

  const filteredIncidents = incidents.filter((incident) => {
    if (activeButton === "all") {
      return true;
    }
    if (activeButton === "construction site") {
      return incident.reported_by === "site";
    }
    if (activeButton === "civilians") {
      return incident.reported_by === "civilian";
    }
    return false;
  });

  return (
    <View style={[{ flex: 1 }, styles.screen]}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate("Home")}>
          <Icon as={ArrowLeftIcon} />
        </Pressable>
        <Text style={styles.headerText}>All Incidents</Text>
      </View>
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {["all", "construction site", "civilians"].map((status) => (
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
                {status === "construction site"
                  ? "Construction site"
                  : status.charAt(0).toUpperCase() + status.slice(1)}
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

export default AllIncidentsOrg;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
  },
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
    width: (screenWidth - 50) / 3,
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
    fontSize: 12,
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
