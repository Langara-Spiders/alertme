import { Text } from "@gluestack-ui/themed";
import React from "react";
import { FormattedMessage } from "react-intl";
import { StyleSheet, View } from "react-native";
import { Button } from "../components/atoms";

const GetStarted = () => {
  return (
    <View style={styles.container}>
      <View style={styles.colorBackground} />
      <View style={styles.content}>
        <Text style={styles.header}>
          <FormattedMessage id="GetStarted.go" defaultMessage="Let's go!" />
        </Text>
        <Text style={styles.text}>
          <FormattedMessage
            id="GetStarted.alert"
            defaultMessage="Signup to AlertMe app to get started quickly to community application"
          />
        </Text>
        <View style={styles.buttonContainer}>
          <Button>
            <Text style={styles.buttonText}>
              <FormattedMessage
                id="GetStarted.started"
                defaultMessage="Get Started"
              />
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  colorBackground: {
    flex: 1,
    backgroundColor: "#FFF3EA",
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 30,
    fontWeight: 700,
    color: "#0B0C0C",
    marginBottom: 12,
  },
  text: {
    marginBottom: 32,
    fontSize: 18,
    textAlign: "left",
    color: "#0B0C0C",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#FFF",
  },
});

export default GetStarted;
