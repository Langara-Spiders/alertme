import {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  View,
} from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

import SvgUri from "react-native-svg-uri";
import { getSiteIssuesForOrg } from "../../api/incident";
import Back_Icon from "../../assets/icons/System_Icons/ArrowLeft.svg";
import { IncidentCard } from "../../components/molecules";
import { useStore } from "../../store";
import Loader from "../Loader";

const SiteIncidentsOrg = (props) => {
  const { navigation } = props;
  const [loading, setLoading] = useState(true);
  const [activeButton, setActiveButton] = useState("all");
  const [incidents, setIncidents] = useState([]);

  const { palette } = useStore();

  useEffect(() => {
    getSiteIncidentsAll();
    const interval = setInterval(() => {
      getSiteIncidentsAll();
    }, 5000);

    setLoading(false);
    return () => clearInterval(interval);
  }, [activeButton]);

  const getSiteIncidentsAll = async () => {
    const response = await getSiteIssuesForOrg(
      activeButton === "all" ? null : activeButton
    );

    const incidentsWithDistance = response ?? [];
    // Sort incidents by distance
    incidentsWithDistance.sort((a, b) => a.distance - b.distance);
    setIncidents(incidentsWithDistance);

    setTimeout(() => setLoading(false), 2000);
  };

  const renderItem = ({ item }) => <IncidentCard {...item} />;

  const ItemSeparator = () => <View style={styles.separator} />;

  const handleButtonPress = (buttonType) => {
    setLoading(true);
    setActiveButton(buttonType);
  };

  const filteredIncidents = incidents.filter((incident) => {
    if (activeButton === "all") {
      return true;
    }
    return incident.status.toLowerCase() === activeButton;
  });

  if (loading) return <Loader />;

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
      borderRadius: 30,
      opacity: 0.8,
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
        <Text style={styles.headerText}>Site Reports</Text>
      </View>
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {["all", "active", "resolved"].map((status) => (
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
      <View style={{ flex: 1, marginTop: 16 }}>
        {loading ? (
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={LoadingGif}
              style={{
                width: 100,
                height: 100,
              }}
              alt="loader image"
            />
          </View>
        ) : (
          <FlatList
            data={filteredIncidents}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={ItemSeparator}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
    </View>
  );
};

export default SiteIncidentsOrg;
