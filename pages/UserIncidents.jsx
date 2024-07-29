import * as Location from "expo-location";

import {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  View,
} from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { FormattedMessage } from "react-intl";
import SvgUri from "react-native-svg-uri";
import { getMyIssues } from "../api/incident";
import Back_Icon from "../assets/icons/System_Icons/Back_Icon_Filled.svg";
import { IncidentCard } from "../components/molecules";

const filterOptions = [
  {
    label: (
      <FormattedMessage id="UserIncidents.filter.all" defaultMessage="All" />
    ),
    value: "all",
  },
  {
    label: (
      <FormattedMessage
        id="UserIncidents.filter.active"
        defaultMessage="Active"
      />
    ),
    value: "active",
  },
  {
    label: (
      <FormattedMessage
        id="UserIncidents.filter.pending"
        defaultMessage="Pending"
      />
    ),
    value: "pending",
  },
  {
    label: (
      <FormattedMessage
        id="UserIncidents.filter.fixing"
        defaultMessage="Fixing"
      />
    ),
    value: "fixing",
  },
  {
    label: (
      <FormattedMessage
        id="UserIncidents.filter.resolved"
        defaultMessage="Resolved"
      />
    ),
    value: "resolved",
  },
  {
    label: (
      <FormattedMessage
        id="UserIncidents.filter.rejected"
        defaultMessage="Rejected"
      />
    ),
    value: "rejected",
  },
];

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
        <Pressable
          onPress={() => navigation.navigate("Home")}
          style={styles.iconContainer}
        >
          <SvgUri
            width="24"
            height="24"
            source={Back_Icon}
            style={styles.icon}
          />
        </Pressable>
        <Text style={styles.headerText}>
          <FormattedMessage
            id="UserIncidents.title.myreports"
            defaultMessage="My Reports"
          />
        </Text>
      </View>
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {filterOptions.map((status) => (
            <TouchableOpacity
              key={status.value}
              style={[
                styles.button,
                activeButton === status.value
                  ? styles.activeButton
                  : styles.inactiveButton,
              ]}
              onPress={() => handleButtonPress(status.value)}
            >
              <Text
                style={[
                  styles.buttonText,
                  activeButton === status.value
                    ? styles.activeButtonText
                    : styles.inactiveButtonText,
                ]}
              >
                {status.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={{ flex: 1, marginTop: 16 }}>
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
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
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
    opacity: 0.5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  filterContainer: {
    marginTop: 12,
  },
  scrollContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
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
});
