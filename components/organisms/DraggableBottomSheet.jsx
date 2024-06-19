import { Text, View } from "@gluestack-ui/themed";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import BottomSheet from "react-native-simple-bottom-sheet";

const DraggableBottomSheet = forwardRef((props, ref) => {
  const bottomSheetRef = useRef();
  const [isModalVisible, setModalVisible] = useState(false);

  //its a custom hook that allows to expose certain function from the parent component

  useImperativeHandle(ref, () => ({
    togglePanel: () => {
      setModalVisible(!isModalVisible);
    },
  }));

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
                    {[...Array(10)].map((_, index) => (
                      <View key={`${index}`} style={{ height: 50, width: 100 }}>
                        <Text>{`List Item ${index + 1}`}</Text>
                      </View>
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
    maxHeight: "50%",
  },
});
