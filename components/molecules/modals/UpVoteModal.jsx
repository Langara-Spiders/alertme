import { Text, View } from "@gluestack-ui/themed";
import { FormattedMessage } from "react-intl";
import { StyleSheet } from "react-native";
import { Button } from "../../atoms";

const UpVoteModal = ({ type, onConfirm, onClose }) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.confirmationCard}>
        {type === "upVote" && (
          <>
            <Text style={styles.title}>
              <FormattedMessage
                id="upvoteModal.upvote"
                defaultMessage="👍Confirm Up-vote?"
              />
            </Text>
            <View style={styles.container}>
              <Text style={styles.confirmationText}>
                <FormattedMessage
                  id="upvoteModal.trust"
                  defaultMessage="We trust that your up-vote is genuine and based on the incident you reviewed. Please refrain from misusing this community application."
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
                  onPress={onClose}
                >
                  <Text style={{ color: "#000", fontSize: 16 }}>
                    <FormattedMessage id="common.no" defaultMessage="No" />
                  </Text>
                </Button>
                <Button
                  style={{ button: { paddingHorizontal: 50, marginLeft: 6 } }}
                  onPress={onConfirm}
                >
                  <Text style={{ color: "#fff", fontSize: 16 }}>
                    <FormattedMessage
                      id="common.confirm"
                      defaultMessage="Confirm"
                    />
                  </Text>
                </Button>
              </View>
            </View>
          </>
        )}

        {type === "approveIncident" && (
          <>
            <Text style={styles.title}>
              <FormattedMessage
                id="approveIncident.confirm"
                defaultMessage="👍Approve an incident?"
              />
            </Text>
            <View style={styles.container}>
              <Text style={styles.confirmationText}>
                <FormattedMessage
                  id="approveIncident.description"
                  defaultMessage="You are approving this posted incident by a civilian as this is a genuine incident inspected by you. You want to post this on the map and inform others."
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
                  onPress={onClose}
                >
                  <Text style={{ color: "#000", fontSize: 16 }}>
                    <FormattedMessage id="common.no" defaultMessage="No" />
                  </Text>
                </Button>
                <Button
                  style={{ button: { paddingHorizontal: 60, marginLeft: 6 } }}
                  onPress={onConfirm}
                >
                  <Text style={{ color: "#fff", fontSize: 16 }}>
                    <FormattedMessage
                      id="common.approve"
                      defaultMessage="Approve"
                    />
                  </Text>
                </Button>
              </View>
            </View>
          </>
        )}

        {type === "reject" && (
          <>
            <Text style={styles.title}>
              <FormattedMessage
                id="rejectIncident.confirm"
                defaultMessage="🚫 Reject an incident"
              />
            </Text>
            <View style={styles.container}>
              <Text style={styles.confirmationText}>
                <FormattedMessage
                  id="rejectIncident.description"
                  defaultMessage="Are you sure you want to reject this incident?"
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
                  onPress={onClose}
                >
                  <Text style={{ color: "#000", fontSize: 16 }}>
                    <FormattedMessage id="common.no" defaultMessage="No" />
                  </Text>
                </Button>
                <Button onPress={onConfirm}>
                  <Text style={{ color: "#fff", fontSize: 16 }}>
                    <FormattedMessage
                      id="common.reject"
                      defaultMessage="Reject"
                    />
                  </Text>
                </Button>
              </View>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default UpVoteModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 16,
  },
  confirmationCard: {
    width: "100%",
    maxWidth: 400,
    padding: 24,
    backgroundColor: "#fff",
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  container: {
    marginHorizontal: 24,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 600,
    color: "#000",
    textAlign: "center",
  },
  confirmationText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#000",
    textAlign: "center",
  },
  confirmationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
