import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

import { View } from "@gluestack-ui/themed";
import { useRef } from "react";
import BottomSheet from "react-native-simple-bottom-sheet";

const DraggableBottomSheet = (props) => {
  const bottomSheetRef = useRef();

  return (
    <Modal
      visible={props.isOpen}
      transparent={true}
      animationType="slide"
      onRequestClose={() => props.onClose()}
    >
      <TouchableWithoutFeedback onPress={() => props.onClose()}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.bottomSheetContainer}>
              <BottomSheet ref={bottomSheetRef} isOpen={props.isOpen}>
                {(onScrollEndDrag) => (
                  <ScrollView onScrollEndDrag={onScrollEndDrag}>
                    {props.children}
                  </ScrollView>
                )}
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
    maxHeight: "60%",
  },
});
