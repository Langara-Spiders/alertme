import { Text, View } from "@gluestack-ui/themed";
import { FormattedMessage } from "react-intl";
import { StyleSheet } from "react-native";
import { Button } from "../../atoms";

const UpVoteModal = (props) => {
  return (
    <View style={styles.confirmationCard}>
      <Text style={styles.confirmationText}>
        <FormattedMessage
          id="upvoteModal.upvote"
          defaultMessage="👍Confirm Up-vote?"
        />
      </Text>

      <Text style={styles.confirmationText}>
        <FormattedMessage
          id="upvoteModal.trust"
          defaultMessage="We trust that your up-vote is genuine and based on the incident you reviewed. Please refrain from misusing this community application."
        />
      </Text>
      <View style={styles.confirmationButtons}>
        <Button style={styles.no} onPress={props.onClose}>
          <FormattedMessage id="upvoteModal.no" defaultMessage="No" />
        </Button>
        <Button style={styles.yes} onPress={onConfirm}>
          <Text textStyle={styles.buttonTextBlack}>
            <FormattedMessage id="upvoteModal.yes" defaultMessage="Confirm" />
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default UpVoteModal;

const styles = StyleSheet.create({
  confirmationCard: {
    display: "flex",
    width: '100%', 
    padding: 20,
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    bottom: 30,  
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  confirmationText: {
    fontSize: 18,
    marginBottom: 10,
    color: "#000",
  },
  confirmationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  no: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: "#FFF",
    color: "#000",
    margin: 5,
    padding: 10,
  },
  yes: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: "#4CAF50",
    color: "#FFF",
    margin: 5,
    padding: 10,
  },
  buttonTextBlack: {
    color: "#000",
  },
});



