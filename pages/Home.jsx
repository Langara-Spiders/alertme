import * as Location from "expo-location";

import {
  Input,
  InputField,
  InputIcon,
  InputSlot,
  SearchIcon,
  Text,
  View,
} from "@gluestack-ui/themed";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { IncidentCard, SuccessCard } from "../components/molecules";

import { FormattedMessage } from "react-intl";
import SvgUri from "react-native-svg-uri";
import { getNearbyIncident } from "../api/incident";
import AddIssueIcon from "../assets/icons/add-issue-icon.svg";
import BellIcon from "../assets/icons/bell-icon.svg";
import CurrentLocationIcon from "../assets/icons/current-location-icon.svg";
import Construction_Cap from "../assets/icons/Markers/Construction_Cap.svg";
import Hazard_Sign from "../assets/icons/Markers/Hazard_Sign-1.svg";
import Posted_Incident from "../assets/icons/Markers/Posted_Incident.svg";
import Verified from "../assets/icons/Markers/Verified.svg";
import NearbyIssuesIcon from "../assets/icons/nearby-issues-icon.svg";
import { DBottomSheet } from "../components/organisms";
import { routes } from "../constants";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Home = ({ navigation, route }) => {
  const [nearbyIssues, setNearbyIssues] = useState([]);
  const [showQuickView, setShowQuickView] = useState(false);
  const [quickViewIssue, setQuickViewIssue] = useState({});
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const [AddIssueVisible, setAddIssueVisible] = useState(false);
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const mapRef = useRef(null);

  const { successType, coordinate } = route?.params ?? {};

  // ######################## USE EFFECTS ########################

  useEffect(() => {
    if (successType && !successType.startsWith("animate")) {
      setShowSuccessCard(true);
      setTimeout(() => {
        setShowSuccessCard(false);
      }, 2000);
    }
    if (successType?.startsWith("post") || successType?.startsWith("animate")) {
      console.log(coordinate);
      animateToMap(coordinate?.lat, coordinate?.lng);
    }
  }, [successType]);

  useEffect(() => {
    getNearbyIncidentAPICall();
    handleRecenter();
    const interval = setInterval(() => {
      getNearbyIncidentAPICall();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ######################## USE EFFECTS ########################

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
    navigation.navigate(routes.INCIDENT_DETAIL, { incident });
  };

  const handleGroupSelect = (group) => {
    setAddIssueVisible(false);
    navigation.navigate(routes.REPORT_INCIDENT, { userGroup: group });
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
  };

  // ######################## MARKERS (VERFIED OR NOT )########################

  const whichMarker = (issue) => {
    if (issue.reported_by === "USER" && issue.upvote_count < 3) {
      return (
        <View style={styles.markerStyles}>
          <View style={styles.markerInner}>
            <SvgUri width="38" height="36" source={Hazard_Sign} />
          </View>
        </View>
      );
    } else if (issue.reported_by === "USER" && issue.upvote_count >= 3) {
      return (
        <View style={styles.markerStyles}>
          <View style={styles.markerInner}>
            <SvgUri width="38" height="36" source={Posted_Incident} />
          </View>
        </View>
      );
    } else if (
      issue.reported_by === "USER" &&
      issue.is_accepted_by_org === true
    ) {
      return (
        <View style={styles.markerStyles}>
          <View style={styles.markerInner}>
            <SvgUri width="38" height="36" source={Verified} />
          </View>
        </View>
      );
    } else if (issue.reported_by === "ORGANIZATION") {
      return (
        <View style={styles.markerStyles}>
          <View style={styles.markerInner}>
            <SvgUri width="38" height="36" source={Construction_Cap} />
          </View>
        </View>
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {showSuccessCard && (
        <Animated.View style={styles.successCardContainer}>
          <SuccessCard type={successType?.split("-")?.at(0)} />
        </Animated.View>
      )}
      <View style={styles.searchContainer}>
        <Input
          style={{
            flex: 1,
            backgroundColor: "white",
            height: 48,
            borderRadius: 12,
            marginRight: 10,
          }}
        >
          <InputSlot pl="$3">
            <InputIcon as={SearchIcon} />
          </InputSlot>
          <InputField placeholder="Search..." />
        </Input>
        <TouchableOpacity
          onPress={() => navigation.navigate(routes.NOTIFICATIONS)}
        >
          <View style={styles.notificationButton}>
            <SvgUri width="16" height="18" source={BellIcon} />
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
          userInterfaceStyle="dark"
          provider={MapView.PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 49.225,
            longitude: -123.1076,
            latitudeDelta: 0.02,
            longitudeDelta: 0.03,
          }}
        >
          {nearbyIssues?.map((issue) => {
            return (
              <Marker
                key={issue.id}
                coordinate={{
                  latitude: issue.coordinate.lat,
                  longitude: issue.coordinate.lng,
                }}
                hideCallout
                highlighted={false}
                onPress={() => handleMarkerPress(issue)}
              >
                {whichMarker(issue)}
              </Marker>
            );
          })}
        </MapView>
        <View style={styles.buttonsContainerLeft}>
          <TouchableOpacity onPress={handleRecenter}>
            <View style={styles.locationIcon}>
              <SvgUri width="48" height="48" source={CurrentLocationIcon} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonsContainerRight}>
          <TouchableOpacity
            onPress={() => navigation.navigate(routes.REPORT_INCIDENT)}
          >
            <View style={styles.addIssueButton}>
              <View style={styles.addIssueIcon}>
                <SvgUri width="28" height="28" source={AddIssueIcon} />
              </View>
              <Text style={styles.addIssueText}>
                <FormattedMessage
                  id="home.addIsuue"
                  defaultMessage="Add Issue"
                />
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsSheetVisible(true)}>
            <View style={styles.nearbyIssueButton}>
              <View style={styles.nearbyIssueIcon}>
                <SvgUri width="28" height="28" source={NearbyIssuesIcon} />
              </View>
              <Text style={styles.addIssueText}>
                <FormattedMessage
                  id="home.nearbyIssues"
                  defaultMessage="Nearby Issues"
                />
              </Text>
            </View>
          </TouchableOpacity>
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
          <TouchableOpacity
            onPress={() => {
              setIsSheetVisible(false);
              navigation.navigate(routes.NEARBYACTIVEISSUES, {
                incidents: nearbyIssues,
              });
            }}
          >
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
    left: 0,
    top: 20,
    zIndex: 99,
    elevation: 99,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    width: "100%",
    paddingHorizontal: 10,
  },
  buttonsContainerLeft: {
    position: "absolute",
    left: 30,
    bottom: 40,
    gap: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainerRight: {
    position: "absolute",
    right: 0,
    bottom: 10,
    gap: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
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
    bottom: 0,
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
    color: "white",
  },
  addIssueButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
    justifyContent: "center",
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
    width: 48,
    height: 48,
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
