import { Image, Text, View } from "@gluestack-ui/themed";
import { uniqueId } from "lodash";
import React, { useState } from "react";
import { Modal, StyleSheet } from "react-native";
import { Button, StatusBadge } from "../components/atoms";
import { PostedByCard, UpVoteCard, UpVoteModal } from "../components/molecules";
import { routes } from "../constants";
import useStore from "../store/useStore";

const IncidentDetail = ({ route, navigation }) => {
  const { incident } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const { id, name, isStaff } = useStore.getState().getUser();
  const current_logged_in_user_id = id;

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
        successType = `upvoted-${uniqueId()}`;
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
    console.log(successType);
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

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: incident.image || "https://picsum.photos/200/300" }}
        style={styles.image}
        alt="Incident Image"
      />
      <View style={styles.detailsContainer}>
        <View style={styles.header}>
          <StatusBadge status={incident.status} />
          <View style={styles.iconsContainer}>
            <Text style={styles.iconButton}>🖋️</Text>
            <Text style={styles.iconButton}>🛢️</Text>
          </View>
        </View>
        <Text style={styles.title}>{incident.subject}</Text>
        <Text style={styles.title}>{incident.distance}</Text>
        <Text style={styles.heading}>Incident Location</Text>
        <Text>
          {incident.streetAddress}, <Text style={styles.viewMap}>View Map</Text>
        </Text>
        <Text style={styles.heading}>Incident Type</Text>
        <View style={styles.typeContainer}>
          <Image
            source={{ uri: "https://picsum.photos/200/300" }}
            style={styles.typeIcon}
            alt="category icon"
          />
          <Text>{incident.incident_category_name}</Text>
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
  container: { flex: 1 },
  image: { width: "100%", height: 200 },
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
});
