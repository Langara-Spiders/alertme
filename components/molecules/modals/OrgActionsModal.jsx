import { Text, View } from "@gluestack-ui/themed";
import { FormattedMessage } from "react-intl";
import { StyleSheet } from "react-native";
import { Button } from "../../atoms";

const OrgActionsModal = ({ type, onConfirm, onClose }) => {
  return (
    <View style={styles.backdrop}>
      <View style={styles.confirmationCard}>
        {type === "approveIncident" && (
          <>
            <Text style={styles.Heading}>
              <FormattedMessage
                id="approveIncident.confirm"
                defaultMessage="👍Approve an incident?"
              />
            </Text>
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
                  <FormattedMessage
                    id="approveIncident.no"
                    defaultMessage="No"
                  />
                </Text>
              </Button>
              <Button
                style={{ button: { paddingHorizontal: 60, marginLeft: 6 } }}
                onPress={onConfirm}
              >
                <Text style={{ color: "#fff", fontSize: 16 }}>
                  <FormattedMessage
                    id="approveIncident.approve"
                    defaultMessage="Approve"
                  />
                </Text>
              </Button>
            </View>
          </>
        )}

        {type === "reject" && (
          <>
            <Text style={styles.confirmationText}>
              <FormattedMessage
                id="rejectIncident.confirm"
                defaultMessage="🚫 Reject an incident"
              />
            </Text>
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
                  <FormattedMessage
                    id="rejectIncident.no"
                    defaultMessage="No"
                  />
                </Text>
              </Button>
              <Button
                style={{ button: { paddingHorizontal: 60, marginLeft: 6 } }}
                onPress={onConfirm}
              >
                <Text style={{ color: "#fff", fontSize: 16 }}>
                  <FormattedMessage
                    id="rejectIncident.reject"
                    defaultMessage="Reject"
                  />
                </Text>
              </Button>
            </View>
          </>
        )}

        {type === "resolveIncident" && (
          <>
            <Text style={styles.Heading}>
              <FormattedMessage
                id="resolveIncident.confirm"
                defaultMessage="👍Resolve an incident?"
              />
            </Text>
            <Text style={styles.confirmationText}>
              <FormattedMessage
                id="resolveIncident.description"
                defaultMessage="Are you sure to resolve an incident?"
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
                  <FormattedMessage
                    id="resolveIncident.no"
                    defaultMessage="No"
                  />
                </Text>
              </Button>
              <Button
                style={{ button: { paddingHorizontal: 60, marginLeft: 6 } }}
                onPress={onConfirm}
              >
                <Text style={{ color: "#fff", fontSize: 16 }}>
                  <FormattedMessage
                    id="resolveIncident.yes"
                    defaultMessage="Yes"
                  />
                </Text>
              </Button>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default OrgActionsModal;

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
