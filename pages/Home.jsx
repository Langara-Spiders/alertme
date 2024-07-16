import * as Location from "expo-location";

import { Text, View } from "@gluestack-ui/themed";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  IncidentCard,
  NumOfIssuesCard,
  Search,
  SuccessCard,
} from "../components/molecules";

import { useIsFocused } from "@react-navigation/native";
import { FormattedMessage } from "react-intl";
import SvgUri from "react-native-svg-uri";
import { getNearbyIncident } from "../api/incident";
import AddIssueIcon from "../assets/icons/add-issue-icon.svg";
import BellIcon from "../assets/icons/bell-icon.svg";
import CurrentLocationIcon from "../assets/icons/current-location-icon.svg";
import ConfirmedHazardIcon from "../assets/icons/map_markers/conf_hazard_icon.svg";
import ConstructionHazardIcon from "../assets/icons/map_markers/const_hazard_icon.svg";
import HazardIcon from "../assets/icons/map_markers/hazard_icon.svg";
import VerifiedHazardIcon from "../assets/icons/map_markers/verf_hazard_icon.svg";
import NearbyIssuesIcon from "../assets/icons/nearby-issues-icon.svg";
import { DBottomSheet } from "../components/organisms";
import { routes } from "../constants";
import mapStyle from "../utils/mapStyle.json"; // Import the custom map style

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Home = ({ navigation, route }) => {
  const [nearbyIssues, setNearbyIssues] = useState([]);
  const [showQuickView, setShowQuickView] = useState(false);
  const [quickViewIssue, setQuickViewIssue] = useState({});
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const [AddIssueVisible, setAddIssueVisible] = useState(false);
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showNumOfIssuesCard, setShowNumOfIssuesCard] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchContainerWidth, setSearchContainerWidth] = useState(screenWidth);
  const mapRef = useRef(null);

  const { successType, coordinates } = route?.params ?? {};
  const { isStaff } = route.params;
  const isFocused = useIsFocused();

  // ######################## USE EFFECTS ########################

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setIsSheetVisible(false);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (successType && !successType.startsWith("animate")) {
      setShowSuccessCard(true);
      setTimeout(() => {
        setShowSuccessCard(false);
      }, 2000);
    }
    if (successType?.startsWith("post") || successType?.startsWith("animate")) {
      animateToMap(coordinates?.lat, coordinates?.lng);
    }
  }, [successType]);

  useEffect(() => {
    getNearbyIncidentAPICall();
    handleRecenter();
    const interval = setInterval(() => {
      getNearbyIncidentAPICall();
    }, 5000);

    // Show the card when the component mounts
    setShowNumOfIssuesCard(true);

    // Hide NumOfIssuesCard after 5 seconds
    const timer = setTimeout(() => {
      setShowNumOfIssuesCard(false);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  // ######################## USE EFFECTS ########################

  useEffect(() => {
    if (!isFocused) {
      setSearchValue("");
      setSelectedLocation(null);
    } else {
      // Recenter the map to the current location
      handleRecenter();
    }
  }, [isFocused]);

  useEffect(() => {}, [searchValue]);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const { coords } = location ?? {};
    return coords ?? {};
  };

  // ######################## API CALLS ########################

  const getNearbyIncidentAPICall = async () => {
    const { latitude, longitude } = await getLocation();
    const response = await getNearbyIncident(latitude, longitude);
    setNearbyIssues(response?.data ?? []);
  };

  // ######################## Nearest First ########################

  nearbyIssues.sort((a, b) => a.distance - b.distance);

  // ######################## API CALLS ########################

  const handleCardPress = (incident) => {
    setIsSheetVisible(false);
    navigation.navigate(routes.INCIDENT_DETAIL, { incident });
  };

  const handleViewAllPress = () => {
    setIsSheetVisible(false); // Close the bottom sheet when the "View All" button is pressed
    navigation.navigate(routes.NEARBYACTIVEISSUES, {
      incidents: nearbyIssues,
    });
  };

  const handleMarkerPress = (issue) => {
    setQuickViewIssue(null);
    setShowQuickView(true);
    setQuickViewIssue(issue);
    // Animated.timing(opacity, {
    //   toValue: 1,
    //   duration: 500,
    //   useNativeDriver: true,
    // }).start();
  };

  const animateToMap = (latitude, longitude) => {
    mapRef?.current?.animateToRegion(
      {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      1000
    );
  };

  const handleRecenter = async () => {
    const { latitude, longitude } = await getLocation();
    animateToMap(latitude, longitude);
    setSearchValue(""); // Clear the search value
    setSelectedLocation(null);
  };

  const handleSearchChange = (text) => {
    setSearchValue(text);
  };

  const handleSearchSelect = (selectedValue) => {
    const { lat, lon, formatted } = selectedValue;

    setSearchValue(formatted);
    setSelectedLocation({
      latitude: lat,
      longitude: lon,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });

    // animation is based on the new state values
    setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.animateToRegion(
          {
            latitude: lat,
            longitude: lon,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
          1000
        );
      }
    }, 0);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {showSuccessCard && (
        <Animated.View style={styles.successCardContainer}>
          <SuccessCard type={successType?.split("-")?.at(0)} />
        </Animated.View>
      )}
      <View
        style={styles.searchContainer}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          const adjustedWidth = width - 40; // Subtracting pixels for left and right margins
          setSearchContainerWidth(adjustedWidth);
        }}
      >
        <Search
          value={searchValue}
          onChange={handleSearchChange}
          onSelect={handleSearchSelect}
          containerWidth={searchContainerWidth}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate(routes.NOTIFICATIONS)}
        >
          <View style={styles.notificationButton}>
            <SvgUri width="22" height="22" source={BellIcon} />
          </View>
        </TouchableOpacity>
        {showQuickView ? (
          <TouchableOpacity
            onPress={() => setShowQuickView(false)}
            style={styles.incidentQuickViewContainer}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(routes.INCIDENT_DETAIL, {
                  incident: quickViewIssue,
                })
              }
            >
              <IncidentCard
                id={quickViewIssue?.id}
                status={quickViewIssue?.status}
                subject={quickViewIssue?.subject}
                description={quickViewIssue?.description}
                address={quickViewIssue?.address}
                created_at={quickViewIssue?.created_at}
                upvote_count={quickViewIssue?.upvote_count}
                images={quickViewIssue?.images}
                onPress={() => handleCardPress(quickViewIssue)}
                style={{
                  position: "absolute",
                  top: 30,
                  left: 20,
                  right: 20,
                  zIndex: 99,
                  elevation: 99,
                }}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        ) : null}
      </View>
      {showNumOfIssuesCard && (
        <View style={styles.numOfIssuesCardContainer}>
          <NumOfIssuesCard numOfIssues={nearbyIssues.length} />
        </View>
      )}
      <View
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MapView
          ref={mapRef}
          style={styles.map}
          customMapStyle={mapStyle} // Apply custom map style here
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 49.225,
            longitude: -123.1076,
            latitudeDelta: 0.02,
            longitudeDelta: 0.03,
          }}
        >
          {nearbyIssues?.map((issue) => {
            if (
              issue.coordinates &&
              issue.coordinates.lat &&
              issue.coordinates.lng
            ) {
              return (
                <Marker
                  key={issue.id}
                  coordinate={{
                    latitude: issue.coordinates.lat,
                    longitude: issue.coordinates.lng,
                  }}
                  hideCallout
                  highlighted={false}
                  onPress={() => handleMarkerPress(issue)}
                >
                  <View style={styles.markerStyles}>
                    <View style={styles.markerInner}>
                      <SvgUri
                        width="38"
                        height="36"
                        source={
                          issue.reported_by === "USER" &&
                          issue.is_accepted_by_org
                            ? VerifiedHazardIcon
                            : issue.reported_by === "USER" &&
                                issue.upvote_count >= 3
                              ? ConfirmedHazardIcon
                              : issue.reported_by === "ORG"
                                ? ConstructionHazardIcon
                                : HazardIcon
                        }
                      />
                    </View>
                  </View>
                </Marker>
              );
            } else {
              console.warn(`Issue ${issue.id} has invalid coordinates`);
              return null;
            }
          })}
          {selectedLocation && (
            <Marker
              coordinate={{
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
              }}
              onPress={() => {
                alert("direction");
              }}
            >
              {/* <View style={styles.markerStyles}>
                <View style={styles.markerInner}>
                  <SvgUri width="38" height="36" source={ConfirmedHazardIcon} />
                </View>
              </View> */}
            </Marker>
          )}
        </MapView>
        <View style={styles.buttonsContainerLeft}>
          <TouchableOpacity onPress={handleRecenter}>
            <View style={styles.locationIcon}>
              <SvgUri width="50" height="50" source={CurrentLocationIcon} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonsContainerRight}>
          <TouchableOpacity
            onPress={() => navigation.navigate(routes.REPORT_INCIDENT)}
          >
            <View style={styles.addIssueButton}>
              <View style={styles.addIssueIcon}>
                <SvgUri width="32" height="32" source={AddIssueIcon} />
              </View>
              <Text style={styles.addIssueText}>
                <FormattedMessage
                  id="home.addIsuue"
                  defaultMessage="Add Issue"
                />
              </Text>
            </View>
          </TouchableOpacity>
          {!isStaff && (
            <TouchableOpacity onPress={() => setIsSheetVisible(true)}>
              <View style={styles.nearbyIssueButton}>
                <View style={styles.nearbyIssueIcon}>
                  <SvgUri width="32" height="32" source={NearbyIssuesIcon} />
                </View>
                <Text style={styles.addIssueText}>
                  <FormattedMessage
                    id="home.nearbyIssues"
                    defaultMessage="Nearby Issues"
                  />
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <DBottomSheet
        isOpen={isSheetVisible}
        onClose={() => setIsSheetVisible(false)}
      >
        <View style={styles.bottomSHeader}>
          <Text style={styles.bottomSText}>
            <FormattedMessage
              id="Nearby.layout"
              defaultMessage="Nearby Active Issues"
            />
          </Text>
          <TouchableOpacity onPress={handleViewAllPress}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        {nearbyIssues?.map((issue) => (
          <View key={issue.id}>
            <TouchableWithoutFeedback
              onPress={() => {
                handleCardPress(issue);
                setIsSheetVisible(false);
              }}
            >
              <View>
                <IncidentCard {...issue} />
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.separator} />
          </View>
        ))}
      </DBottomSheet>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "grey",
    backgroundColor: "#09090D",
  },
  searchContainer: {
    position: "absolute",
    left: 2,
    right: 2,
    top: 10,
    zIndex: 99,
    elevation: 99,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 20,
  },
  numOfIssuesCardContainer: {
    position: "absolute",
    top: 110,
    left: "50%",
    transform: [{ translateX: -110 }],
    zIndex: 98,
    elevation: 98,
  },
  buttonsContainerLeft: {
    position: "absolute",
    left: 30,
    bottom: 105,
    borderRadius: 50,
  },
  buttonsContainerRight: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    right: -15,
    bottom: 95,
    gap: 20,
    flexDirection: "column",
    justifyContent: "center",
  },
  mapContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject, // Ensure the map takes the full container size
  },
  reportIncidentBtn: {
    position: "absolute",
    bottom: 10,
    left: 0,
    zIndex: 99,
    elevation: 99,
  },
  heading: {
    fontSize: 18,
    fontWeight: 600,
    paddingBottom: 10,
  },
  itemText: {
    padding: 10,
    fontSize: 16,
    fontWeight: 400,
  },
  bottomContainer: {
    paddingBottom: 32,
  },
  bottomSHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  bottomSText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E1E1E",
  },
  viewAllText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF9900",
  },
  successCardContainer: {
    position: "absolute",
    bottom: 80,
    width: "100%",
    zIndex: 100,
    padding: 16,
  },
  incidentQuickViewContainer: {
    position: "absolute",
    padding: 10,
    paddingTop: 5,
    top: 0,
    left: 0,
    backgroundColor: "transparent",
    width: screenWidth,
    height: screenHeight,
  },
  addIssueText: {
    color: "black",
    textShadowColor: "white",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    fontWeight: "bold",
    fontSize: 16,
  },
  addIssueButton: {
    display: "flex",
    alignItems: "center",
    marginRight: 20,
  },
  addIssueIcon: {
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 56,
    height: 56,
    borderRadius: 16,
  },
  nearbyIssueButton: {
    display: "flex",
    alignItems: "center",
    marginRight: 20,
  },
  nearbyIssueIcon: {
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 56,
    height: 56,
    borderRadius: 16,
  },
  notificationButton: {
    backgroundColor: "white",
    borderRadius: 12,
    width: 52,
    height: 52,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    height: 10,
  },
  markerStyles: {
    borderColor: "rgba(0,0,0,.1)",
    borderRadius: 50,
    borderWidth: 15,
  },
  markerInner: {
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 10,
    borderColor: "rgba(0,0,0,.2)",
    elevation: 5,
  },
});
