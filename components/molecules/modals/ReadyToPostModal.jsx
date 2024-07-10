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
            <Button
              style={{
                button: {
                  backgroundColor: "#fff",
                  paddingHorizontal: 64,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 64,
                  borderWidth: 1,
                  borderColor: "#222425",
                  marginRight: 6,
                },
              }}
              onPress={props.onCancel}
            >
              <Text style={{ color: "#000", fontSize: 16 }}>
                <FormattedMessage id="readyModal.no" defaultMessage="No" />
              </Text>
            </Button>

            <Button
              style={{ button: { paddingHorizontal: 60, marginLeft: 6 } }}
              onPress={props.onConfirm}
            >
              <Text style={{ color: "#fff", fontSize: 16 }}>
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
    backgroundColor: "rgba(11, 12, 12, 0.7)",
    justifyContent: "flex-end",
    alignItems: "center",
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
    paddingHorizontal: 10,
  },
});
