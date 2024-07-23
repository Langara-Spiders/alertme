import * as Location from "expo-location";

import { Text, View } from "@gluestack-ui/themed";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { NumOfIssuesCard, Search, SuccessCard } from "../components/molecules";

import { useIsFocused } from "@react-navigation/native";
import { FormattedMessage } from "react-intl";
import SvgUri from "react-native-svg-uri";
import { getNearbyIncident } from "../api/incident";
import AddIssueIcon from "../assets/icons/add-issue-icon.svg";
import CurrentLocationIcon from "../assets/icons/current-location-icon.svg";
import ConfirmedHazardIcon from "../assets/icons/map_markers/conf_hazard_icon.svg";
import HazardIcon from "../assets/icons/map_markers/hazard_icon.svg";
import VerifiedHazardIcon from "../assets/icons/map_markers/verf_hazard_icon.svg";
import NearbyIssuesIcon from "../assets/icons/nearby-issues-icon.svg";
import NotificationBellActiveIcon from "../assets/icons/notification-bell-active.svg";
import NotificationBellIcon from "../assets/icons/notification-bell.svg";
import LoadingGif from "../assets/loading.gif";
import IncidentCard from "../components/molecules/cards/IncidentCard";
import { DBottomSheet } from "../components/organisms";
import { routes } from "../constants";
import { useStore } from "../store";
import mapStyle from "../utils/mapStyle.json";

const screenWidth = Dimensions.get("screen").width; // Changed from "window" to "screen"
const screenHeight = Dimensions.get("screen").height;

const Home = ({ navigation, route }) => {
  const { getNotifications } = useStore();
  const [loading, setLoading] = useState(true);
  const [nearbyIssues, setNearbyIssues] = useState([]);
  const [showQuickView, setShowQuickView] = useState(false);
  const [quickViewIssue, setQuickViewIssue] = useState({});
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const [AddIssueVisible, setAddIssueVisible] = useState(false);
  const [notificationUpdate, setNotificationUpdate] = useState(false);
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [searchContainerWidth, setSearchContainerWidth] = useState(screenWidth);
  const [searchValue, setSearchValue] = useState("");
  const [showNumOfIssuesCard, setShowNumOfIssuesCard] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [highlightedMarkerId, setHighlightedMarkerId] = useState(null);
  const mapRef = useRef(null);

  const { successType, coordinates, markerId } = route?.params ?? {};
  const { isStaff } = route.params;
  const isFocused = useIsFocused();
  const notifications = getNotifications();

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
      setHighlightedMarkerId(markerId);
      setShowQuickView(false);
      setQuickViewIssue(null);
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

  useEffect(() => {
    const unreadNotificationPresent = notifications.some(
      (notification) => !notification.read_flag
    );
    setNotificationUpdate(unreadNotificationPresent);
  }, [notifications]);

  // ######################## USE EFFECTS ########################

  useEffect(() => {
    if (!isFocused) {
      setSearchValue("");
      setSelectedLocation(null);
    } else {
      // Recenter the map to the current location if coordinates are not provided
      if (!coordinates) {
        handleRecenter();
      }
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
    setLoading(false);
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
    setQuickViewIssue(issue);
    setShowQuickView(true);

    console.log(showQuickView);
    // setHighlightedMarkerId(issue.id);
  };

  const animateToMap = (latitude, longitude) => {
    if (latitude && longitude) {
      mapRef?.current?.animateToRegion(
        {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        1000
      );
    }
  };

  const opacity = useRef(new Animated.Value(0)).current;

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

  const handleMapPress = () => {
    setHighlightedMarkerId(null);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Image
          source={LoadingGif}
          style={styles.loadingIcon}
          alt="loader image"
        />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={handleMapPress}>
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
              <SvgUri
                width="22"
                height="22"
                source={
                  notificationUpdate
                    ? NotificationBellActiveIcon
                    : NotificationBellIcon
                }
              />
            </View>
          </TouchableOpacity>
          {showQuickView ? (
            <TouchableOpacity
              onPress={() => setShowQuickView(false)}
              style={styles.incidentQuickViewContainer}
            >
              <View style={styles.incidentQuickViewContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setShowQuickView(false);
                    navigation.navigate(routes.INCIDENT_DETAIL, {
                      incident: quickViewIssue,
                    });
                  }}
                >
                  <IncidentCard {...quickViewIssue} />
                </TouchableOpacity>
              </View>
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
            onPress={handleMapPress} // Clear highlight and quick card when map is pressed
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
                    <View
                      style={[
                        styles.markerStyles,
                        highlightedMarkerId === issue.id &&
                          styles.highlightedMarkerOuter,
                      ]}
                    >
                      <View
                        style={[
                          styles.markerInner,
                          highlightedMarkerId === issue.id &&
                            styles.highlightedMarkerInner, // highlighting style
                        ]}
                      >
                        <SvgUri
                          width="30"
                          height="28"
                          source={
                            issue.reported_by === "USER" &&
                            issue.is_accepted_by_org
                              ? VerifiedHazardIcon
                              : issue.reported_by === "USER" &&
                                  issue.upvote_count >= 3
                                ? ConfirmedHazardIcon
                                : issue.reported_by === "ORG"
                                  ? VerifiedHazardIcon
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
                    defaultMessage="Report"
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
                      defaultMessage="Nearby"
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
          fixedHeader={
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
          }
        >
          {nearbyIssues?.map((issue) => (
            <View key={issue.id}>
              <TouchableWithoutFeedback
                onPress={() => {
                  handleCardPress(issue);
                  setIsSheetVisible(false);
                }}
              >
                <View>
                  <IncidentCard {...issue} hideStatus={true} />
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.separator} />
            </View>
          ))}
        </DBottomSheet>
      </View>
    </TouchableWithoutFeedback>
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
    left: 0,
    top: Platform.OS === "ios" ? 44 : 0,
    zIndex: 99,
    elevation: 99,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 20,
  },
  numOfIssuesCardContainer: {
    position: "absolute",
    top: 132,
    left: "50%",
    transform: [{ translateX: -110 }],
    zIndex: 98,
    elevation: 98,
  },
  buttonsContainerLeft: {
    position: "absolute",
    left: 30,
    bottom: 132,
    borderRadius: 50,
  },
  buttonsContainerRight: {
    position: "absolute",
    display: "flex",
    alignItems: "flex-end", // Align items to the right
    right: 16,
    bottom: 120,
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
    padding: 16,
    paddingTop: 0,
    top: 10,
    left: 0,
    backgroundColor: "transparent",
    width: screenWidth,
    height: screenHeight,
    zIndex: 3,
  },
  addIssueText: {
    color: "black",
    textShadowColor: "white",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    fontWeight: "bold",
    fontSize: 12,
    marginTop: 5,
    textAlign: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  addIssueButton: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginRight: 0,
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
    flexDirection: "column",
    marginRight: 0,
  },
  nearbyIssueIcon: {
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 56,
    height: 56,
    borderRadius: 16,
    color: "green",
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
    borderWidth: 10,
  },
  markerInner: {
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 10,
    padding: 5,
    borderColor: "rgba(0,0,0,.2)",
    elevation: 5,
  },
  highlightedMarkerOuter: {
    borderColor: "rgba(255, 145, 64, 0.2)",
    borderRadius: 50,
    borderWidth: 15,
  },
  highlightedMarkerInner: {
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 10,
    elevation: 5,
    borderColor: "rgba(255, 145, 64, 0.5)",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: screenWidth,
    height: screenHeight,
    backgroundColor: "black",
    opacity: 0.5,
    zIndex: 2, // Ensure it's below the quick view container
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingIcon: {
    width: 100,
    height: 100,
  },
});
