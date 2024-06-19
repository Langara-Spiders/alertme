import { Text, View } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
import Button from "../../atoms";

const CongratsModal = (props) => {
  return (
    <View>
      <View style={styles.confirmationCard}>
        <Text style={styles.confirmationText}>
          <FormattedMessage
            id="congratsModal.congrats"
            defaultMessage="Congratulations🎉"
          />
        </Text>
        <Text style={styles.confirmationText}>
          <FormattedMessage
            id="congratsModal.ready"
            defaultMessage="Your registration is complete. You are now ready to use AlertMe application"
          />
        </Text>

        <View style={styles.confirmationButtons}>
          <Button
            style={styles.yes}
            textStyle={styles.buttonTextBlack}
            onPress={props.onConfirm}
          >
            <FormattedMessage
              id="congratsModal.Launch"
              defaultMessage="Launch App🚀"
            />
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  confirmationCard: {
    display: "flex",
    width: 346,
    padding: 64,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 10,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -173 }, { translateY: -150 }],
    backgroundColor: "#212121",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  confirmationText: {
    fontSize: 24,
    marginBottom: 10,
    color: "#FFF",
  },
  genuineText: {
    fontSize: 18,
    marginBottom: 10,
    color: "#FFF",
  },
  confirmationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  confirmationButton: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ddd",
    marginRight: 10,
    alignItems: "center",
  },
  yes: {
    borderRadius: 90,
    backgroundColor: "#FFF",
  },
  buttonTextBlack: {
    color: "#000",
    fontSize: 18,
  },
});

export default CongratsModal;
