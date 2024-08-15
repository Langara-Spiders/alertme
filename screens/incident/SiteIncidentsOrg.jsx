import {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  View,
} from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

import { FormattedMessage } from "react-intl";
import { getSiteIssuesForOrg } from "../../api/incident";
import BackIcon from "../../assets/icons/common_icons/arrow_left.png";
import LoadingGif from "../../assets/loading.gif";
import { IncidentCard } from "../../components/molecules";
import { useStore } from "../../store";

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

    setTimeout(() => setLoading(false), 1000);
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

  const styles = StyleSheet.create({
    screen: {
      backgroundColor: palette.bg1,
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
      backgroundColor: palette.backButtonBg,
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
      color: palette.txt1,
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
      backgroundColor: palette.primary2,
    },
    inactiveButton: {
      backgroundColor: palette.bg2,
      borderWidth: 1,
      borderColor: palette.bg2,
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
          <Image source={BackIcon} style={styles.icon} />
        </Pressable>
        <Text style={styles.headerText}>
          <FormattedMessage id="SiteInc.title" defaultMessage="Site Reports" />
        </Text>
      </View>
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {[
            {
              value: "all",
              label: (
                <FormattedMessage id="filterBtn.all" defaultMessage="All" />
              ),
            },
            {
              value: "active",
              label: (
                <FormattedMessage
                  id="filterBtn.active"
                  defaultMessage="Active"
                />
              ),
            },
            {
              value: "resolved",
              label: (
                <FormattedMessage
                  id="filterBtn.resolved"
                  defaultMessage="Resolved"
                />
              ),
            },
          ].map((status) => (
            <TouchableOpacity
              key={status}
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
