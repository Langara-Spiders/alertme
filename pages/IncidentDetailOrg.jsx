import * as Location from "expo-location";

import { Image, ScrollView, Text, View } from "@gluestack-ui/themed";
import { uniqueId } from "lodash";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Modal, StyleSheet, TouchableOpacity } from "react-native";
import SvgUri from "react-native-svg-uri";
import { getIncidentDetailsForUser } from "../api/incident";
import Back_Icon from "../assets/icons/System_Icons/Back_Icon_Filled.svg";
import Location_Spot from "../assets/icons/System_Icons/Location_spot.svg";
import Scroll_Dot from "../assets/icons/System_Icons/Scroll_Dot.svg";
import ABCD from "../assets/images/sample_user.png";
import { Button, LargeActionButton, StatusBadge } from "../components/atoms";
import {
  OrgActionsModal,
  PostedByCard,
  UpVoteCard,
} from "../components/molecules";
import { routes } from "../constants";
import useStore from "../store/useStore";
import { calculateDistance } from "../utils/CalculateDistance";

const IncidentDetailOrg = ({ route, navigation }) => {
  const { incident_id } = route.params;
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [userCoords, setUserCoords] = useState({ latitude: 0, longitude: 0 });
  const { id, name, isStaff } = useStore.getState().getUser();
  const current_logged_in_user_id = id;

  useEffect(() => {
    fetchIncidentDetails();
    const intervalId = setInterval(() => {
      fetchIncidentDetails();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const { coords } = location ?? {};
    setUserCoords(coords);
    return coords ?? {};
  };

  const fetchIncidentDetails = async () => {
    const { latitude, longitude } = await getLocation();
    const response = await getIncidentDetailsForUser(
      latitude,
      longitude,
      incident_id
    );
    setIncident(response);
    setLoading(false);
  };

  const calculateIncidentDistance = () => {
    if (incident && userCoords.latitude && userCoords.longitude) {
      return calculateDistance(
        userCoords.latitude,
        userCoords.longitude,
        incident.coordinates.lat,
        incident.coordinates.lng
      );
    }
    return 0;
  };

  const handleModalOpen = (type) => {
    setModalType(type);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const onConfirm = async () => {
    handleModalClose();
    let successType;
    switch (modalType) {
      case "reject":
        successType = `reject-${uniqueId()}`;
        break;
      case "approveIncident":
        successType = `approve-${uniqueId()}`;
        break;
      case "resolveIncident":
        successType = `resolve-${uniqueId()}`;
        break;
    }
    navigation.navigate(routes.HOME, { successType });
  };

  const showReportedBySectionUSER = () => {
    return isStaff && incident.reported_by === "USER";
  };

  const renderActionButton = () => {
    if (showReportedBySectionUSER()) {
      if (!incident.is_accepted_by_org) {
        switch (incident.status) {
          case "ACTIVE":
            return (
              <>
                <View style={styles.upvoteCardContainer}>
                  <UpVoteCard
                    upVotes={incident.upvote_count}
                    voters={incident.voters}
                  />
                </View>
                <View style={styles.confirmationButtons}>
                  <Button
                    onPress={() => handleModalOpen("reject")}
                    style={styles.rejectButton}
                  >
                    <FormattedMessage
                      id="IncidentDetailOrg.Reject"
                      defaultMessage="Reject"
                      disabled={false}
                    />
                  </Button>

                  <Button
                    onPress={() => handleModalOpen("approveIncident")}
                    style={styles.approveButton}
                  >
                    <FormattedMessage
                      id="IncidentDetailOrg.Approve"
                      defaultMessage="Approve"
                      disabled={false}
                    />
                  </Button>
                </View>
              </>
            );
          case "PENDING":
            return (
              <>
                <View style={styles.upvoteCardContainer}>
                  <UpVoteCard
                    upVotes={incident.upvote_count}
                    voters={incident.voters}
                  />
                </View>
                <View style={styles.largeButtonCardContainer}>
                  <LargeActionButton
                    onPress={() => handleModalOpen("resolveIncident")}
                    buttonText="Resolve"
                    disabled={false}
                  />
                </View>
              </>
            );
          case "REJECTED":
            return (
              <>
                <View style={styles.upvoteCardContainer}>
                  <UpVoteCard
                    upVotes={incident.upvote_count}
                    voters={incident.voters}
                  />
                </View>
                <View style={styles.largeButtonCardContainer}>
                  <LargeActionButton
                    onPress={() => handleModalOpen("resolveIncident")}
                    buttonText="Rejected"
                    disabled={true}
                  />
                </View>
              </>
            );
          default:
            return null;
        }
      } else {
        switch (incident.status) {
          case "FIXING":
            return (
              <>
                <View style={styles.upvoteCardContainer}>
                  <UpVoteCard
                    upVotes={incident.upvote_count}
                    voters={incident.voters}
                  />
                </View>
                <View style={styles.largeButtonCardContainer}>
                  <LargeActionButton
                    onPress={() => handleModalOpen("resolveIncident")}
                    buttonText="Resolve"
                    disabled={false}
                  />
                </View>
              </>
            );
          case "RESOLVED":
            return (
              <>
                <View style={styles.upvoteCardContainer}>
                  <UpVoteCard
                    upVotes={incident.upvote_count}
                    voters={incident.voters}
                  />
                </View>
                <View style={styles.largeButtonCardContainer}>
                  <LargeActionButton
                    onPress={() => handleModalOpen("resolveIncident")}
                    buttonText="Resolved"
                    disabled={true}
                  />
                </View>
              </>
            );
          default:
            return null;
        }
      }
    } else {
      switch (incident.status) {
        case "ACTIVE":
          return (
            <View style={styles.largeButtonCardContainer}>
              <LargeActionButton
                onPress={() => handleModalOpen("resolveIncident")}
                buttonText="Resolve"
                disabled={false}
              />
            </View>
          );
        case "RESOLVED":
          return (
            <View style={styles.largeButtonCardContainer}>
              <LargeActionButton
                onPress={() => handleModalOpen("resolveIncident")}
                buttonText="Resolved"
                disabled={true}
              />
            </View>
          );
        default:
          return null;
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Image source={ABCD} style={styles.loadingIcon} alt="loader image" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.imageScrollContainer}
        >
          {incident.images.map((img, index) => (
            <Image
              key={index}
              source={{ uri: img }}
              style={styles.image}
              alt={`Incident Image ${index + 1}`}
            />
          ))}
        </ScrollView>
        <View style={styles.dotsContainer}>
          {incident.images.map((_, index) => (
            <SvgUri
              key={index}
              width="16"
              height="16"
              source={Scroll_Dot}
              style={styles.dot}
            />
          ))}
        </View>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.goBack()}
        >
          <SvgUri
            width="24"
            height="24"
            source={Back_Icon}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.detailsContainer}>
        <StatusBadge status={incident.status} style={styles.statusBadge} />
        <Text style={styles.title}>{incident.subject}</Text>
        <Text style={styles.distance}>
          {calculateIncidentDistance().toFixed(2)} km away
        </Text>
        <Text style={styles.heading}>Incident Location</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(routes.HOME, {
              successType: `animateTo-${uniqueId()}`,
              coordinates: incident?.coordinates,
            })
          }
          style={styles.locationText}
        >
          <Text>
            <SvgUri width="16" height="16" source={Location_Spot} />
            {"  "}
            {incident.address.street_address},{" "}
            <Text style={styles.viewMap}>View Map</Text>
          </Text>
        </TouchableOpacity>
        <Text style={styles.heading}>Incident Type</Text>
        <View style={styles.typeContainer}>
          <View style={styles.iconBackground}>
            <SvgUri
              width="24"
              height="24"
              source={{ uri: incident.category_icon }}
            />
          </View>
          <Text style={styles.categoryText}>{incident.category_name}</Text>
        </View>
        <Text style={styles.heading}>Description</Text>
        <Text style={styles.description}>{incident.description}</Text>
        <Text style={styles.heading}>
          {showReportedBySectionUSER() ? "Posted by" : "Verified by"}
        </Text>
        <View style={styles.user_name}>
          <PostedByCard
            name={incident.user_name}
            created_at={incident.created_at}
          />
        </View>
      </ScrollView>
      <View style={styles.bottomFixedContainer}>
        <View style={styles.bottomModalContent}>{renderActionButton()}</View>
      </View>
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={handleModalClose}
        presentationStyle="overFullScreen"
        transparent={true}
      >
        <OrgActionsModal
          onClose={handleModalClose}
          onConfirm={onConfirm}
          type={modalType}
        />
      </Modal>
    </View>
  );
};

export default IncidentDetailOrg;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    position: "relative",
    height: 250,
  },
  imageScrollContainer: {
    height: "100%",
  },
  image: {
    width: 400,
    height: "100%",
  },
  dotsContainer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    marginHorizontal: 4,
  },
  iconContainer: {
    position: "absolute",
    top: 20,
    left: 10,
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F3F4F4",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
    opacity: 0.5,
  },
  detailsContainer: {
    flex: 1,
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "white",
    overflow: "hidden",
    marginTop: -20,
  },
  statusBadge: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
  },
  distance: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  heading: {
    color: "#888",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 8,
  },
  locationText: {
    marginTop: 4,
    marginBottom: 8,
  },
  viewMap: {
    color: "#FF6600",
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 8,
  },
  iconBackground: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#F3F4F4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  description: {
    marginTop: 4,
    marginBottom: 8,
  },
  user_reported: {
    marginTop: 4,
  },
  upvoteCardContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingIcon: {
    width: 50,
    height: 50,
  },
  bottomFixedContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    paddingVertical: 0,
    paddingHorizontal: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  bottomModalContent: {
    backgroundColor: "white",
    paddingVertical: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  confirmationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  largeButtonCardContainer: {
    marginTop: 10,
  },
  rejectButton: {
    button: {
      borderWidth: 1,
      borderColor: "#000",
      backgroundColor: "white",
      width: 166,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      color: "#000",
      fontSize: 16,
      fontWeight: "600",
    },
  },
  approveButton: {
    button: {
      backgroundColor: "#FF6600",
      width: 166,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      color: "#FFF",
      fontSize: 16,
      fontWeight: "600",
    },
  },
});
