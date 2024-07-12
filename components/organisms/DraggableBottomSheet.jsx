import React, { useRef } from "react";
import {
  Dimensions,
  Easing,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import BottomSheet from "react-native-simple-bottom-sheet";

const DraggableBottomSheet = (props) => {
  const bottomSheetRef = useRef(null);
  const screenHeight = Dimensions.get("window").height;

  return (
    <Modal
      visible={props.isOpen}
      transparent={true}
      animationType="slide"
      onRequestClose={props.onClose}
    >
      <TouchableWithoutFeedback onPress={props.onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.bottomSheetContainer}>
              <BottomSheet
                ref={bottomSheetRef}
                isOpen={props.isOpen}
                sliderMaxHeight={Math.min(screenHeight * 0.8, 600)}
                animation={Easing.quad}
                animationDuration={200}
              >
                <ScrollView>{props.children}</ScrollView>
              </BottomSheet>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default DraggableBottomSheet;

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
});
