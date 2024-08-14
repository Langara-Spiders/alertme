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
import { useStore } from "../../store";

const DraggableBottomSheet = (props) => {
  const bottomSheetRef = useRef(null);
  const screenHeight = Dimensions.get("window").height;
  const { palette } = useStore();

  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: "flex-end",
    },
    bottomSheetContainer: {
      backgroundColor: palette.bg1,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    sheetContent: {
      flex: 1,
    },
  });

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
                animationDuration={100}
              >
                <View style={styles.sheetContent}>
                  {props.fixedHeader}
                  <ScrollView>{props.children}</ScrollView>
                </View>
              </BottomSheet>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default DraggableBottomSheet;
