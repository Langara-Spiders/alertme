import * as Location from "expo-location";

import {
  ArrowUpIcon,
  BellIcon,
  ButtonIcon,
  EditIcon,
  Icon,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  MenuIcon,
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
import { getNearbyIncident } from "../api/incident";
import { Button } from "../components/atoms";
import { DBottomSheet } from "../components/organisms";
import { routes } from "../constants";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Home = ({ navigation, route }) => {
  const [nearbyIssues, setNearbyIssues] = useState([]);
  const [quickViewIssue, setQuickViewIssue] = useState({});
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const [AddIssueVisible, setAddIssueVisible] = useState(false);
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const mapRef = useRef(null);

  const { successType } = route?.params ?? {};

  // ######################## USE EFFECTS ########################

  useEffect(() => {
    if (
      successType?.startsWith("upvoted") ||
      successType?.startsWith("confirm") ||
      successType?.startsWith("approve") ||
      successType?.startsWith("reject") ||
      successType?.startsWith("post")
    ) {
      setShowSuccessCard(true);
      setTimeout(() => {
        setShowSuccessCard(false);
      }, 2000);
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

  // ######################## API CALLS ########################

  const handleCardPress = (incident) => {
    setIsSheetVisible(false);
    navigation.navigate(routes.INCIDENT_DETAIL, { incident });
  };

  const handleGroupSelect = (group) => {
    setAddIssueVisible(false);
    navigation.navigate(routes.REPORT_INCIDENT, { userGroup: group });
  };

  const handleMarkerPress = (issue) => {
    setQuickViewIssue(issue);
  };

  const handleRecenter = async () => {
    const { latitude, longitude } = await getLocation();
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

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {showSuccessCard && (
        <Animated.View style={styles.successCardContainer}>
          <SuccessCard type={successType?.split("-")?.at(0)} />
        </Animated.View>
      )}
      <View style={styles.searchContainer}>
        <Input style={{ flex: 1, backgroundColor: "white" }}>
          <InputSlot pl="$3">
            <InputIcon as={SearchIcon} />
          </InputSlot>
          <InputField placeholder="Search..." />
        </Input>
        <Button
          style={styles.button}
          onPress={() => {
            navigation.navigate(routes.NOTIFICATIONS);
          }}
        >
          <ButtonIcon as={BellIcon} />
        </Button>
        {Object.values(quickViewIssue).length ? (
          <TouchableOpacity
            onPress={() => setQuickViewIssue({})}
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
                status={quickViewIssue?.status}
                subject={quickViewIssue?.subject}
                description={quickViewIssue?.description}
                created_at={quickViewIssue?.created_at}
                upvote_count={quickViewIssue?.upvote_count}
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
          provider={MapView.PROVIDER_GOOGLEr}
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
              />
            );
          })}
        </MapView>
        <View style={styles.buttonsContainerLeft}>
          <TouchableOpacity onPress={() => handleRecenter()}>
            <View>
              <Icon as={ArrowUpIcon} color="#ffffff" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonsContainerRight}>
          <TouchableOpacity
            onPress={() => navigation.navigate(routes.REPORT_INCIDENT)}
          >
            <View style={styles.addIssueButton}>
              <Icon as={EditIcon} color="#ffffff" />
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
              <Icon as={MenuIcon} color="#ffffff" />
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
                incidents: incidentsArray,
              });
            }}
          >
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        {nearbyIssues?.map((issue) => (
          <TouchableWithoutFeedback
            key={issue.id}
            onPress={() => handleCardPress(issue)}
          >
            <View>
              <IncidentCard
                status={issue?.status}
                subject={issue?.subject}
                description={issue?.description}
                created_at={issue?.created_at}
                upvote_count={issue?.upvote_count}
              />
            </View>
          </TouchableWithoutFeedback>
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E1E1E",
  },
  viewAllText: {
    fontSize: 14,
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
  nearbyIssueButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
