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
import { getCivilianIssuesForOrg } from "../api/incident";
import { IncidentCard } from "../components/molecules";
import useStore from "../store/useStore";
import {
  initializeSound,
  playClickSound,
  releaseSound,
} from "../utils/SoundManager";

const screenWidth = Dimensions.get("window").width;

const CivilianIncidentsOrg = (props) => {
  const { navigation } = props;
  const [activeButton, setActiveButton] = useState("all");
  const [incidents, setIncidents] = useState([]);
  const { switchValues } = useStore();

  useEffect(() => {
    initializeSound();
    return () => {
      releaseSound();
    };
  }, []);

  useEffect(() => {
    getCivilianIncidentsAll();
    // handleRecenter();
    const interval = setInterval(() => {
      getCivilianIncidentsAll();
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

  const getCivilianIncidentsAll = async () => {
    const { latitude, longitude } = await getLocation();
    const response = await getCivilianIssuesForOrg(
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
    if (switchValues.applicationSound) {
      playClickSound();
    }
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

export default CivilianIncidentsOrg;

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
    width: (screenWidth - 10) / 4,
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
