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

import * as Location from "expo-location";
import { getMyIssues } from "../api/incident";
import { IncidentCard } from "../components/molecules";

const screenWidth = Dimensions.get("window").width;

const UserIncidents = (props) => {
  const { navigation } = props;
  const [activeButton, setActiveButton] = useState("all");
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    getMyIncidentsNearBy();
    const interval = setInterval(() => {
      getMyIncidentsNearBy();
    }, 5000);

    return () => clearInterval(interval);
  }, [activeButton]);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const { coords } = location ?? {};
    return coords ?? {};
  };

  const getMyIncidentsNearBy = async () => {
    const { latitude, longitude } = await getLocation();
    const response = await getMyIssues(
      latitude,
      longitude,
      activeButton === "all" ? null : activeButton
    );
    const incidentsWithDistance = response ?? [];

    // Sort incidents by distance
    incidentsWithDistance.sort((a, b) => a.distance - b.distance);

    setIncidents(incidentsWithDistance);
  };

  const renderItem = ({ item }) => <IncidentCard {...item} />;

  const ItemSeparator = () => <View style={styles.separator} />;

  const handleButtonPress = (buttonType) => {
    setActiveButton(buttonType);
  };

  const filteredIncidents = incidents.filter((incident) => {
    if (activeButton === "all") {
      return true;
    }
    return incident.status.toLowerCase() === activeButton;
  });

  return (
    <View style={[{ flex: 1 }, styles.screen]}>
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
          {["all", "active", "pending", "resolved", "fixing", "rejected"].map(
            (status) => (
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
            )
          )}
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

export default UserIncidents;

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
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 90,
    height: 32,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 6,
  },
  activeButton: {
    backgroundColor: "#ff6600",
  },
  inactiveButton: {
    backgroundColor: "#F3F4F4",
    borderWidth: 1,
    borderColor: "#F3F4F4",
  },
  buttonText: {
    color: "#FFF",
    fontFamily: "Public Sans",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 14.4,
  },
  activeButtonText: {
    color: "#FFF",
  },
  inactiveButtonText: {
    color: "#636C6E",
  },
  separator: {
    height: 10,
  },
  listContainer: {
    paddingTop: 10,
  },
});
