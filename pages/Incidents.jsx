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
import { IncidentCard } from "../components/molecules";

const incidentData = [
  {
    _id: "1",
    subject: "Oil spill on Main Street",
    description:
      "There is a significant oil spill on Main Street near the intersection with 2nd Avenue.",
    coordinate: { lat: 40.712776, lng: -74.005974 },
    upvote_count: 25,
    report_count: 5,
    status: "Active",
    is_accepted_by_org: false,
    is_internal_for_org: false,
    is_active: true,
    address: "121, 51A Main Street",
    distance: "21KM Away",
    incident_category_name: "Hazard",
    reported_by: "USER",
    created_at: "2024-06-20T12:34:56Z",
    updated_at: "2024-06-20T12:34:56Z",
    user_id_id: "User123",
    project_id: "ProjectX",
    incident_category_id_id: "CategoryA",
    is_staff: false,
  },
  {
    _id: "2",
    subject: "Traffic light malfunction",
    description:
      "The traffic lights at the intersection of 5th Avenue and Broadway are malfunctioning. They are stuck on red.",
    coordinate: { lat: 40.712776, lng: -74.006974 },
    upvote_count: 10,
    report_count: 3,
    status: "Pending",
    address: "121, 51A Main Street",
    distance: "21KM Away",
    is_accepted_by_org: true,
    is_internal_for_org: false,
    is_active: true,
    reported_by: "USER",
    is_staff: false,
    company_name: "XYZ",
    created_at: "2024-06-21T09:15:00Z",
    updated_at: "2024-06-21T09:15:00Z",
    user_id_id: "User456",
    project_id: "ProjectY",
    incident_category_name: "Hazard",
    incident_category_id_id: "CategoryB",
  },
  {
    _id: "3",
    subject: "Graffiti on City Hall",
    description:
      "There is graffiti on the north wall of City Hall. It looks like it was done overnight.",
    coordinate: { lat: 40.713776, lng: -74.005974 },
    upvote_count: 30,
    report_count: 1,
    status: "Resolved",
    is_accepted_by_org: true,
    is_internal_for_org: true,
    address: "121, 51A Main Street",
    distance: "21KM Away",
    is_active: false,
    reported_by: "ORG",
    is_staff: false,
    incident_category_name: "Hazard",
    created_at: "2024-06-22T14:00:00Z",
    updated_at: "2024-06-22T14:00:00Z",
    user_id_id: "User789",
    project_id: "ProjectZ",
    incident_category_id_id: "CategoryC",
  },
  {
    _id: "4",
    subject: "Power outage in downtown",
    description:
      "There is a power outage affecting several blocks in the downtown area.",
    coordinate: { lat: 40.712476, lng: -74.005274 },
    upvote_count: 40,
    report_count: 10,
    status: "Fixing",
    is_accepted_by_org: false,
    is_internal_for_org: false,
    address: "121, 51A Main Street",
    distance: "21KM Away",
    is_active: true,
    reported_by: "USER",
    is_staff: true,
    created_at: "2024-06-22T15:20:00Z",
    incident_category_name: "Hazard",
    updated_at: "2024-06-22T15:20:00Z",
    user_id_id: "User101",
    project_id: "ProjectA",
    incident_category_id_id: "CategoryD",
  },
  {
    _id: "5",
    subject: "Broken water main",
    description:
      "A water main broke on 3rd Avenue and water is flooding the street.",
    coordinate: { lat: 40.711776, lng: -74.004974 },
    upvote_count: 15,
    report_count: 4,
    status: "Active",
    is_accepted_by_org: true,
    is_internal_for_org: false,
    address: "121, 51A Main Street",
    incident_category_name: "Hazard",
    distance: "21KM Away",
    is_active: true,
    is_staff: false,
    reported_by: "ORG",
    created_at: "2024-06-23T07:30:00Z",
    updated_at: "2024-06-23T07:30:00Z",
    user_id_id: "User202",
    project_id: "ProjectB",
    incident_category_id_id: "CategoryE",
  },
  {
    _id: "6",
    subject: "Suspicious package",
    description:
      "A suspicious package has been spotted at the bus stop on 7th Street.",
    coordinate: { lat: 40.715776, lng: -74.005974 },
    upvote_count: 5,
    report_count: 2,
    status: "Resolved",
    is_accepted_by_org: true,
    address: "121, 51A Main Street",
    distance: "21KM Away",
    is_internal_for_org: true,
    incident_category_name: "Hazard",
    is_active: false,
    is_staff: false,
    reported_by: "User303",
    created_at: "2024-06-23T08:00:00Z",
    updated_at: "2024-06-23T08:00:00Z",
    user_id_id: "User303",
    project_id: "ProjectC",
    incident_category_id_id: "CategoryF",
  },
  {
    _id: "7",
    subject: "Broken street lamp",
    description:
      "The street lamp on Elm Street is broken and not providing light.",
    coordinate: { lat: 40.712776, lng: -74.003974 },
    upvote_count: 12,
    report_count: 3,
    status: "Fixing",
    is_accepted_by_org: false,
    is_internal_for_org: false,
    address: "121, 51A Main Street",
    distance: "21KM Away",
    is_active: true,
    is_staff: false,
    incident_category_name: "Hazard",
    reported_by: "User404",
    created_at: "2024-06-23T10:00:00Z",
    updated_at: "2024-06-23T10:00:00Z",
    user_id_id: "User404",
    project_id: "ProjectD",
    incident_category_id_id: "CategoryG",
  },
  {
    _id: "8",
    subject: "Road closure due to flooding",
    description:
      "The road is closed due to severe flooding after a heavy rainstorm.",
    coordinate: { lat: 40.714776, lng: -74.007974 },
    upvote_count: 20,
    report_count: 6,
    status: "Active",
    is_accepted_by_org: true,
    is_internal_for_org: false,
    address: "121, 51A Main Street",
    distance: "21KM Away",
    is_active: true,
    is_staff: false,
    incident_category_name: "Hazard",
    reported_by: "User505",
    created_at: "2024-06-23T11:45:00Z",
    updated_at: "2024-06-23T11:45:00Z",
    user_id_id: "User505",
    project_id: "ProjectE",
    incident_category_id_id: "CategoryH",
  },
  {
    _id: "9",
    subject: "Abandoned vehicle",
    description:
      "An abandoned vehicle has been left on Oak Street for over a week.",
    coordinate: { lat: 40.713776, lng: -74.002974 },
    upvote_count: 8,
    report_count: 2,
    status: "Resolved",
    is_accepted_by_org: true,
    is_internal_for_org: true,
    address: "121, 51A Main Street",
    distance: "21KM Away",
    is_active: false,
    is_staff: false,
    incident_category_name: "Hazard",
    reported_by: "User606",
    created_at: "2024-06-23T14:20:00Z",
    updated_at: "2024-06-23T14:20:00Z",
    user_id_id: "User606",
    project_id: "ProjectF",
    incident_category_id_id: "CategoryI",
  },
  {
    _id: "10",
    subject: "Illegal dumping at River Park",
    description: "Someone has dumped construction debris at River Park.",
    coordinate: { lat: 40.715776, lng: -74.001974 },
    upvote_count: 18,
    report_count: 4,
    status: "Pending",
    is_accepted_by_org: false,
    address: "121, 51A Main Street",
    distance: "21KM Away",
    is_internal_for_org: false,
    is_active: true,
    is_staff: false,
    incident_category_name: "Hazard",
    reported_by: "User707",
    created_at: "2024-06-23T16:00:00Z",
    updated_at: "2024-06-23T16:00:00Z",
    user_id_id: "User707",
    project_id: "ProjectG",
    incident_category_id_id: "CategoryJ",
  },
  {
    _id: "11",
    subject: "Broken bench in Green Park",
    description: "A bench in Green Park is broken and unusable.",
    coordinate: { lat: 40.716776, lng: -74.005974 },
    upvote_count: 7,
    report_count: 1,
    status: "Resolved",
    is_accepted_by_org: true,
    is_internal_for_org: true,
    address: "121, 51A Main Street",
    incident_category_name: "Hazard",
    distance: "21KM Away",
    is_active: false,
    is_staff: false,
    reported_by: "User808",
    created_at: "2024-06-24T08:00:00Z",
    updated_at: "2024-06-24T08:00:00Z",
    user_id_id: "User808",
    project_id: "ProjectH",
    incident_category_id_id: "CategoryK",
  },
  {
    _id: "12",
    subject: "Graffiti on library wall",
    description: "There is graffiti on the east wall of the public library.",
    coordinate: { lat: 40.717776, lng: -74.003974 },
    upvote_count: 22,
    report_count: 3,
    incident_category_name: "Hazard",
    status: "Pending",
    address: "121, 51A Main Street",
    distance: "21KM Away",
    is_accepted_by_org: false,
    is_staff: false,
    is_internal_for_org: false,
    is_active: true,
    reported_by: "USER",
    created_at: "2024-06-24T10:00:00Z",
    updated_at: "2024-06-24T10:00:00Z",
    user_id_id: "User909",
    project_id: "ProjectI",
    incident_category_id_id: "CategoryL",
  },
];

const screenWidth = Dimensions.get("window").width;

const Incidents = (props) => {
  const { navigation } = props;
  const [activeButton, setActiveButton] = useState("all");
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const fetchIncidents = async () => {
      setIncidents(incidentData);
    };

    fetchIncidents();
  }, []);

  const renderItem = ({ item }) => (
    <IncidentCard
      subject={item.subject}
      description={item.description}
      upvote_count={item.upvote_count}
      status={item.status}
      created_at={item.created_at}
      image={item.image}
      address={item.address}
      distance={item.distance}
      incident_category_name={item.incident_category_name}
      reported_by={item.reported_by}
      isStaff={item.isStaff}
      user_id_id={item.user_id_id}
      is_accepted_by_org={item.is_accepted_by_org}
    />
  );

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
    <View style={{ flex: 1 }}>
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
          {["all", "active", "pending", "resolved", "fixing"].map((status) => (
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
      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        <FlatList
          data={filteredIncidents}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
          ItemSeparatorComponent={ItemSeparator}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
};

export default Incidents;

const styles = StyleSheet.create({
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
    width: (screenWidth - 10) / 5,
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
