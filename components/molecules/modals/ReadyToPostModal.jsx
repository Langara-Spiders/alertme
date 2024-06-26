import { Text, View } from "@gluestack-ui/themed";
import { FormattedMessage } from "react-intl";
import { Modal, StyleSheet } from "react-native";
import { Button } from "../../atoms";

const ReadyToPostModal = (props) => {
  return (
    <Modal
      visible={props.visible}
      transparent={true}
      animationType="slide"
      onRequestClose={props.onCancel}
    >
      <View style={styles.backdrop}>
        <View style={styles.confirmationCard}>
          <Text style={styles.Heading}>
            <FormattedMessage
              id="readyModal.readytopost"
              defaultMessage="Ready to post the Incident?"
            />
          </Text>
          <Text style={styles.confirmationText}>
            <FormattedMessage
              id="readyModal.confirmation"
              defaultMessage="Here we can say two lines and ask them to confirm"
            />
          </Text>
          <View style={styles.confirmationButtons}>
            <Button style={styles.no} onPress={props.onCancel}>
              <Text>
                <FormattedMessage id="readyModal.no" defaultMessage="No" />
              </Text>
            </Button>
            <Button style={styles.yes} onPress={props.onConfirm}>
              <Text style={styles.buttonTextBlack}>
                <FormattedMessage id="readyModal.yes" defaultMessage="Post" />
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ReadyToPostModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(11, 12, 12, 0.7)", // Semi-transparent backdrop
    justifyContent: "flex-end", // Aligns the modal at the bottom of the screen
    alignItems: "center", // Centers the modal horizontally
    padding: 16,
  },
  confirmationCard: {
    width: "100%",
    maxWidth: 400,
    padding: 24,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 16,
  },
  Heading: {
    fontSize: 20,
    marginBottom: 20,
    color: "#000",
    textAlign: "center",
  },
  confirmationText: {
    fontSize: 18,
    marginBottom: 20,
    color: "#000",
    textAlign: "center",
    paddingBottom: 24,
  },
  confirmationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
  },
  no: {
    flex: 1,
  },
  yes: {
    flex: 1,
  },
  buttonTextBlack: {
    color: "#000",
  },
});
