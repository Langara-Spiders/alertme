import { Text, View } from "@gluestack-ui/themed";
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Button, Input } from "../components/atoms";
import { IncidentImageUpload, ReadyToPostModal } from "../components/molecules";

import { useNavigation } from "@react-navigation/native";

const ReportIncident = () => {
  const intl = useIntl();
  const [incidentCategory, setIncidentCategory] = useState("");
  const [incidentType, setIncidentType] = useState("");
  const [incidentLocation, setIncidentLocation] = useState("");
  const [incidentDescription, setIncidentDescription] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigation = useNavigation();

  const handlePostIncident = () => {
    setShowConfirmation(true);
  };

  const handleCancelPostIncident = () => {
    setShowConfirmation(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <FormattedMessage
          id="reportIncident.title"
          defaultMessage="Report an Incident"
        />
      </Text>
      <View>
        <IncidentImageUpload />
      </View>
      <View style={styles.categoryButtons}>
        <TouchableOpacity
          style={[
            styles.button,
            incidentCategory === "Category1" && styles.selectedButton,
          ]}
          onPress={() => setIncidentCategory("Category1")}
        >
          <Text style={styles.buttonText}>
            <FormattedMessage
              id="reportIncident.categoryBtn1"
              defaultMessage="Category 1"
            />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            incidentCategory === "Category2" && styles.selectedButton,
          ]}
          onPress={() => setIncidentCategory("Category2")}
        >
          <Text style={styles.buttonText}>
            <FormattedMessage
              id="reportIncident.categoryBtn2"
              defaultMessage="Category 2"
            />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            incidentCategory === "Category3" && styles.selectedButton,
          ]}
          onPress={() => setIncidentCategory("Category3")}
        >
          <Text style={styles.buttonText}>
            <FormattedMessage
              id="reportIncident.categoryBtn3"
              defaultMessage="Category 3"
            />
          </Text>
        </TouchableOpacity>
      </View>
      <Input
        style={styles.input}
        placeholder={intl.formatMessage({
          id: "reportIncident.input.incidentType",
          defaultMessage: "Incident Type",
        })}
        value={incidentType}
        onChangeText={setIncidentType}
      />
      <Input
        style={styles.input}
        placeholder={intl.formatMessage({
          id: "reportIncident.input.incidentLocation",
          defaultMessage: "Incident Location",
        })}
        value={incidentLocation}
        onChangeText={setIncidentLocation}
      />
      <Input
        style={styles.textArea}
        placeholder={intl.formatMessage({
          id: "reportIncident.input.incidentDescription",
          defaultMessage: "Incident Description",
        })}
        value={incidentDescription}
        onChangeText={setIncidentDescription}
        multiline
      />
      <Button onPress={handlePostIncident}>
        <FormattedMessage
          id="reportIncident.postBtn"
          defaultMessage="Post Incident"
        />
      </Button>
      {showConfirmation && (
        <View>
          <ReadyToPostModal onCancel={handleCancelPostIncident} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  imagePicker: {
    flexDirection: "row",
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  categoryButtons: {
    flexDirection: "row",
    marginBottom: 20,
  },
  button: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ddd",
    marginRight: 5,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#aaa",
  },
  buttonText: {
    color: "#000",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  textArea: {
    height: 80,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    paddingTop: 10,
  },
});

export default ReportIncident;
