// InfoSheet.js
import React, { useRef } from "react";
import {
  Dimensions,
  Easing,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import BottomSheet from "react-native-simple-bottom-sheet";

const InfoSheet = ({ isOpen, onClose }) => {
  const bottomSheetRef = useRef(null);
  const screenHeight = Dimensions.get("window").height;

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.bottomSheetContainer}>
              <BottomSheet
                ref={bottomSheetRef}
                isOpen={isOpen}
                sliderMaxHeight={Math.min(screenHeight * 0.8, 600)}
                animation={Easing.quad}
                animationDuration={200}
              >
                <ScrollView>
                  <View style={styles.sheetContent}>
                    <Text style={styles.title}>
                      Alertme Rewards System Information
                    </Text>
                    <Text style={styles.paragraph}>
                      Welcome to the AlertMe rewards system! By participating,
                      you agree to the following terms:
                    </Text>
                    <Text style={styles.subTitle}>1. Reporting Incidents:</Text>
                    <Text style={styles.paragraph}>
                      • Each time a player reports an incident, they receive 100
                      points, which equals one badge. • If the reported incident
                      is upvoted by at least 3 other users, the reporting player
                      receives an additional 5 points. • If the reported
                      incident is approved by a construction site worker before
                      being upvoted by other users, the reporting player
                      receives an additional 10 points.
                    </Text>
                    <Text style={styles.subTitle}>
                      2. Scam or False Reports:
                    </Text>
                    <Text style={styles.paragraph}>
                      • If a reported incident is found to be untrue or a scam
                      and is rejected by construction site workers, the
                      reporting player loses 20 points.
                    </Text>
                    <Text style={styles.subTitle}>3. High-Impact Reports:</Text>
                    <Text style={styles.paragraph}>
                      • If a reported incident leads to a significant impact,
                      the reporting player receives a higher reward.
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.understoodButton}
                    onPress={onClose}
                  >
                    <Text style={styles.understoodButtonText}>Understood</Text>
                  </TouchableOpacity>
                </ScrollView>
              </BottomSheet>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default InfoSheet;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  bottomSheetContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  sheetContent: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  paragraph: {
    fontSize: 14,
    marginBottom: 10,
  },
  understoodButton: {
    backgroundColor: "transparent",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 0,
  },
  understoodButtonText: {
    color: "#FFA500",
    fontSize: 16,
    fontWeight: "bold",
  },
});
