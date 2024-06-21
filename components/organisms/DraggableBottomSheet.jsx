import { View } from "@gluestack-ui/themed";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import BottomSheet from "react-native-simple-bottom-sheet";

import { IncidentCard } from "../molecules";

const AllIncidentsArrray = [
  {
    title: "Incident Title",
    description: "Oil Spilled on Main Street",
    status: "Fixing",
    location: "0.21 Km away",
    date: "Date",
    time: "Time",
    image: "https://via.placeholder.com/150",
    votes: "2",
  },
  {
    title: "Incident Title",
    description: "Incident Description",
    status: "Active",
    location: "Location",
    date: "Date",
    time: "Time",
    image: "https://via.placeholder.com/150",
    votes: "2",
  },
  {
    title: "Incident Title",
    description: "Incident Description",
    status: "Active",
    location: "Location",
    date: "Date",
    time: "Time",
    image: "https://via.placeholder.com/150",
    votes: "2",
  },
];

const DraggableBottomSheet = forwardRef(({ navigation }, ref) => {
  const bottomSheetRef = useRef();
  const [isModalVisible, setModalVisible] = useState(false);

  //its a custom hook that allows to expose certain function from the parent component

  useImperativeHandle(ref, () => ({
    togglePanel: () => {
      setModalVisible(!isModalVisible);
    },
  }));

  const handleCardPress = (incident) => {
    setModalVisible(false);
    navigation.navigate("IncidentDetail", { incident });
  };

  return (
    <Modal
      visible={isModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.bottomSheetContainer}>
              {/* This is Just a temporary place Holder  */}
              <BottomSheet ref={bottomSheetRef} isOpen={true}>
                {(onScrollEndDrag) => (
                  <ScrollView onScrollEndDrag={onScrollEndDrag}>
                    {AllIncidentsArrray.map((incident, index) => (
                      <TouchableWithoutFeedback
                        key={index}
                        onPress={() => handleCardPress(incident)}
                      >
                        <View>
                          <IncidentCard
                            status={incident.status}
                            title={incident.title}
                            description={incident.description}
                            location={incident.location}
                            date={incident.date}
                            time={incident.time}
                            image={{ uri: incident.image }}
                            upvote={incident.votes}
                          />
                        </View>
                      </TouchableWithoutFeedback>
                    ))}
                  </ScrollView>
                )}
              </BottomSheet>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
});

export default DraggableBottomSheet;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  bottomSheetContainer: {
    backgroundColor: "white",
    paddingTop: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    maxHeight: "60%",
  },
});
