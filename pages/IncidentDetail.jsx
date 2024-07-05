import { Image, ScrollView, Text, View } from "@gluestack-ui/themed";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, TouchableOpacity } from "react-native";

import { uniqueId } from "lodash";
import SvgUri from "react-native-svg-uri";
import { getIncidentDetailsForUser } from "../api/incident";
import Scroll_Dot from "../assets/icons/System_Icons/Scroll_Dot.svg";
import ABCD from "../assets/images/sample_user.png";
import { Button, StatusBadge } from "../components/atoms";
import { PostedByCard, UpVoteCard, UpVoteModal } from "../components/molecules";
import { routes } from "../constants";
import useStore from "../store/useStore";

const IncidentDetail = ({ route, navigation }) => {
  const { incident_id } = route.params;
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
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

  const handleModalOpen = (type) => {
    setModalType(type);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const onConfirm = () => {
    handleModalClose();
    let successType;
    switch (modalType) {
      case "upVote":
        successType = `confirm-${uniqueId()}`;
        break;
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

  const showUpvoteButton = () => {
    return (
      incident.reported_by === "USER" &&
      incident.user_id !== current_logged_in_user_id &&
      !isStaff
    );
  };

  const showResolveButton = () => {
    return (
      incident.reported_by === "USER" &&
      incident.user_id !== current_logged_in_user_id &&
      isStaff
    );
  };

  const showReportedBySectionUSER = () => {
    return !isStaff && incident.reported_by === "USER";
  };

  const showVerifiedBySectionUSER = () => {
    return !isStaff && incident.reported_by === "ORG";
  };

  const showResolveBySectionORG = () => {
    return (
      isStaff &&
      (incident.upvote_count > 3 || incident.is_accepted_by_org == true)
    );
  };

  console.log("HHGSDHHHHRYAYYY**************");
  console.log(incident);

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
            <SvgUri key={index} width="16" height="16" source={Scroll_Dot} />
          ))}
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.header}>
          <StatusBadge status={incident.status} />
          <View style={styles.iconsContainer}>
            <Text style={styles.iconButton}>🖋️</Text>
            <Text style={styles.iconButton}>🛢️</Text>
          </View>
        </View>
        <Text style={styles.title}>{incident.subject}</Text>
        <Text style={styles.distance}>
          {incident.distance.toFixed(1)} km away
        </Text>
        <Text style={styles.heading}>Incident Location</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(routes.HOME, {
              successType: `animateTo-${uniqueId()}`,
              coordinate: incident?.coordinate,
            })
          }
        >
          <Text>
            {incident.address.street_address},{" "}
            <Text style={styles.viewMap}>View Map</Text>
          </Text>
        </TouchableOpacity>
        <Text style={styles.heading}>Incident Type</Text>
        <View style={styles.typeContainer}>
          <Image
            source={{ uri: incident.category_icon }}
            style={styles.typeIcon}
            alt="category icon"
          />
          <Text>{incident.category_name}</Text>
        </View>
        <Text style={styles.heading}>Description</Text>
        <Text>{incident.description}</Text>
        {showReportedBySectionUSER() && (
          <>
            <Text style={styles.heading}>Reported by</Text>
            <View style={styles.user_name}>
              <PostedByCard
                name={incident.user_name}
                created_at={incident.created_at}
              />
            </View>
            <View style={styles.upvoteCardContainer}>
              <UpVoteCard votes={incident.upvote_count} />
            </View>
            {showUpvoteButton() && (
              <View>
                <Button onPress={() => handleModalOpen("upVote")}>
                  <Text>Upvote Issue</Text>
                </Button>
              </View>
            )}
          </>
        )}
        {showVerifiedBySectionUSER() && (
          <>
            <Text style={styles.heading}>Verified by</Text>
            <View style={styles.user_name}>
              <PostedByCard
                name={incident.reported_by}
                created_at={incident.created_at}
              />
            </View>
          </>
        )}
        {showResolveBySectionORG() && (
          <>
            <Text style={styles.heading}>Reported by</Text>
            <View style={styles.user_reported}>
              <PostedByCard
                name={incident.user_name}
                created_at={incident.created_at}
                user_picture={incident.user_picture}
              />
            </View>
            <View style={styles.upvoteCardContainer}>
              <UpVoteCard votes={incident.upvote_count} />
            </View>
            {showResolveButton() && (
              <View>
                <Button onPress={() => handleModalOpen("resolveIncident")}>
                  <Text>Resolve Issue</Text>
                </Button>
              </View>
            )}
          </>
        )}
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={handleModalClose}
          presentationStyle="overFullScreen"
          transparent={true}
        >
          <UpVoteModal
            onClose={handleModalClose}
            onConfirm={onConfirm}
            type={modalType}
          />
        </Modal>
      </View>
    </View>
  );
};

export default IncidentDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    position: "relative",
    height: 200,
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
    left: "50%",
    marginLeft: -10, // Adjust as needed for perfect centering
    flexDirection: "row",
    alignItems: "center",
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconsContainer: {
    flexDirection: "row",
    marginTop: 3,
  },
  iconButton: {
    marginLeft: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  distance: {
    fontSize: 18,
    fontWeight: "bold",
  },
  heading: {
    color: "#636C6E",
    fontSize: 14,
    fontWeight: "400",
    paddingTop: 18,
    marginTop: 1,
    paddingBottom: 4,
  },
  viewMap: {
    color: "#FF6600",
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  typeIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  upvoteCardContainer: {
    backgroundColor: "white",
    borderRadius: 10,
  },
  upvoteButton: {
    alignItems: "center",
    borderRadius: 10,
  },
  user_reported: {
    marginTop: 1,
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
});
