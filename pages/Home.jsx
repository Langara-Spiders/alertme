import {
  BellIcon,
  ButtonIcon,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  SearchIcon,
  View,
} from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import MapView from "react-native-maps";
import { Button } from "../components/atoms";
import { IncidentCard, SuccessCard } from "../components/molecules";
import { DBottomSheet } from "../components/organisms";
import { routes, userGroups } from "../constants";
import { DateTime } from "../utils";

const user_type = {
  type: "user",
};

const incidentsArray = [
  {
    id: "601f1f77bcf86cd799439008",
    user_id: "601f191e810c19729de860b2",
    user_reported: "Henry Adams",
    incident_category_id: "601f191e810c19729de860b2",
    incident_category_name: "Littering",
    subject: "Littering in Green Park",
    description:
      "Excessive littering observed in Green Park near the main entrance.",
    coordinate: { lat: 40.712776, long: -74.005974 },
    address: "345 E 55 Ave",
    upvote_count: 1,
    report_count: 1,
    status: "active",
    is_accepted_by_org: true,
    is_internal_for_org: false,
    is_active: true,
    reported_by: "ORG",
    created_at: "2023-06-17T09:00:00",
    updated_at: "2023-06-17T09:00:00",
    voters: ["601f191e810c19729de860b3"],
    images: ["littering1.jpg"],
  },
  {
    id: "601f1f77bcf86cd799439009",
    user_id: "601f191e810c19729de860b3",
    user_reported: "Irene Taylor",
    incident_category_id: "601f191e810c19729de860b3",
    incident_category_name: "Noise Complaint",
    subject: "Noise Complaint at Night",
    description:
      "Loud parties at residential area causing disturbances at night.",
    coordinate: { lat: 34.052235, long: -118.243683 },
    address: "125 W 48 Ave",
    upvote_count: 2,
    report_count: 3,
    status: "active",
    is_accepted_by_org: false,
    is_internal_for_org: false,
    is_active: true,
    reported_by: "USER",
    created_at: "2023-06-17T10:30:00",
    updated_at: "2023-06-17T10:30:00",
    voters: ["601f191e810c19729de860b4"],
    images: ["noise_complaint1.jpg"],
  },
  {
    id: "601f1f77bcf86cd799439010",
    user_id: "601f191e810c19729de860b4",
    user_reported: "Jack Nelson",
    incident_category_id: "601f191e810c19729de860b4",
    incident_category_name: "Street Light Outage",
    subject: "Multiple Street Lights Out on 3rd Street",
    description:
      "Several street lights are out on 3rd Street, causing poor visibility at night.",
    coordinate: { lat: 51.507351, long: -0.127758 },
    address: "320 3rd St",
    upvote_count: 0,
    report_count: 2,
    status: "active",
    is_accepted_by_org: true,
    is_internal_for_org: false,
    is_active: true,
    reported_by: "USER",
    created_at: "2023-06-17T11:00:00",
    updated_at: "2023-06-17T11:00:00",
    voters: [],
    images: ["street_light_out1.jpg"],
  },
  {
    id: "601f1f77bcf86cd799439011",
    user_id: "601f191e810c19729de860b5",
    user_reported: "Laura Mitchell",
    incident_category_id: "601f191e810c19729de860b5",
    incident_category_name: "Illegal Parking",
    subject: "Illegal Parking on Maple Street",
    description: "Cars parked illegally along Maple Street blocking driveways.",
    coordinate: { lat: 34.052235, long: -118.243683 },
    address: "234 Maple St",
    upvote_count: 5,
    report_count: 1,
    status: "active",
    is_accepted_by_org: false,
    is_internal_for_org: false,
    is_active: true,
    reported_by: "ORG",
    created_at: "2023-06-17T12:30:00",
    updated_at: "2023-06-17T12:30:00",
    voters: ["601f191e810c19729de860b6", "601f191e810c19729de860b7"],
    images: ["illegal_parking1.jpg"],
  },
  {
    id: "601f1f77bcf86cd799439012",
    user_id: "601f191e810c19729de860b6",
    user_reported: "Nathan Carter",
    incident_category_id: "601f191e810c19729de860b6",
    incident_category_name: "Public Intoxication",
    subject: "Public Intoxication at City Square",
    description:
      "Groups of intoxicated individuals causing disturbances at City Square.",
    coordinate: { lat: 51.507351, long: -0.127758 },
    address: "100 City Square",
    upvote_count: 7,
    report_count: 4,
    status: "active",
    is_accepted_by_org: true,
    is_internal_for_org: false,
    is_active: true,
    reported_by: "USER",
    created_at: "2023-06-17T13:00:00",
    updated_at: "2023-06-17T13:00:00",
    voters: ["601f191e810c19729de860b8", "601f191e810c19729de860b9"],
    images: ["public_intoxication1.jpg", "public_intoxication2.jpg"],
  },
  {
    id: "601f1f77bcf86cd799439013",
    user_id: "601f191e810c19729de860b7",
    user_reported: "Megan Clark",
    incident_category_id: "601f191e810c19729de860b7",
    incident_category_name: "Pothole",
    subject: "Large Pothole on Pine Avenue",
    description: "A large pothole on Pine Avenue poses a risk to vehicles.",
    coordinate: { lat: 40.712776, long: -74.005974 },
    address: "500 Pine Ave",
    upvote_count: 12,
    report_count: 3,
    status: "active",
    is_accepted_by_org: true,
    is_internal_for_org: false,
    is_active: true,
    reported_by: "ORG",
    created_at: "2023-06-17T14:00:00",
    updated_at: "2023-06-17T14:00:00",
    voters: ["601f191e810c19729de860ba", "601f191e810c19729de860bb"],
    images: ["pothole1.jpg", "pothole2.jpg"],
  },
];

const Home = ({ navigation, route }) => {
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const [AddIssueVisible, setAddIssueVisible] = useState(false);
  const [showSuccessCard, setShowSuccessCard] = useState(false);

  const { successType } = route?.params ?? {};

  useEffect(() => {
    if (
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

  const handleCardPress = (incident) => {
    setIsSheetVisible(false);
    navigation.navigate(routes.INCIDENT_DETAIL, { incident });
  };

  const handleGroupSelect = (group) => {
    setAddIssueVisible(false);
    navigation.navigate(routes.REPORT_INCIDENT, { userGroup: group });
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
          style={styles.map}
          userInterfaceStyle="dark"
          provider={MapView.PROVIDER_GOOGLEr}
          initialRegion={{
            latitude: 49.225,
            longitude: -123.1076,
            latitudeDelta: 0.02,
            longitudeDelta: 0.03,
          }}
        />
        {user_type.type === "user" ? (
          <View style={styles.buttonsContainer}>
            <Button onPress={() => navigation.navigate(routes.REPORT_INCIDENT)}>
              <FormattedMessage
                id="home.report"
                defaultMessage="Report Incident"
              />
            </Button>
            <Button onPress={() => setIsSheetVisible(true)}>
              <FormattedMessage
                id="home.NearBy"
                defaultMessage="NearBy Incidents"
              />
            </Button>
          </View>
        ) : (
          <View style={styles.buttonsContainer}>
            <Button onPress={() => setAddIssueVisible(true)}>
              <FormattedMessage
                id="home.AddIssue"
                defaultMessage="Report Incident"
              />
            </Button>
          </View>
        )}
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

        {incidentsArray.map((incident, index) => {
          const { date, time } = DateTime(incident.created_at);
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => handleCardPress(incident)}
            >
              <View>
                <IncidentCard
                  status={incident.status}
                  title={incident.subject}
                  description={incident.description}
                  location={incident.address}
                  date={date}
                  time={time}
                  upvote={incident.upvote_count}
                />
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </DBottomSheet>
      <DBottomSheet
        isOpen={AddIssueVisible}
        onClose={() => setAddIssueVisible(false)}
      >
        <View style={styles.bottomContainer}>
          <Text style={styles.heading}>
            <FormattedMessage
              id="home.bottomsheetheading"
              defaultMessage="Add Issue For"
            />
          </Text>
          {userGroups.map((group, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleGroupSelect(group)}
            >
              <Text style={styles.itemText}>
                <FormattedMessage id={`home.${group}`} defaultMessage={group} />
              </Text>
            </TouchableOpacity>
          ))}
        </View>
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
  buttonsContainer: {
    position: "absolute",
    left: 0,
    bottom: 10,
    gap: 20,
    width: "100%",
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
});
