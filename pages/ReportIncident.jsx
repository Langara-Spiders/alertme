import {
  ArrowLeftIcon,
  Icon,
  Pressable,
  Text,
  View,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { uniqueId } from "lodash";
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { StyleSheet } from "react-native";
import { Button, Input } from "../components/atoms";
import {
  CategoriesModal,
  IncidentImageUpload,
  ReadyToPostModal,
} from "../components/molecules";
import { routes } from "../constants";

const user_type = {
  type: "user",
};

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

  const handleCategorySelect = (category) => {
    console.log("Selected Category:", category);
  };

  const handleConfirmPost = () => {
    setShowConfirmation(false);
    successType = `post-${uniqueId()}`;

    navigation.navigate(routes.HOME, { successType });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate("Home")}>
          <Icon as={ArrowLeftIcon} />
        </Pressable>
        <Text style={styles.headerText}>Add Issue</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>
          <FormattedMessage
            id="reportIncident.titleaddpics"
            defaultMessage="Add Issues Pictures°"
          />
        </Text>
        <View style={{ flex: 1 }}>
          <IncidentImageUpload />
        </View>
        <View style={styles.category}>
          <Text style={styles.title}>
            <FormattedMessage
              id="reportIncident.categories"
              defaultMessage="Incident Category:"
            />
          </Text>
          <CategoriesModal onSelectCategory={handleCategorySelect} />
        </View>
        <Text style={styles.title}>
          <FormattedMessage
            id="reportIncident.incidentType"
            defaultMessage="Incident Category:"
          />
        </Text>
        <Input
          style={styles.input}
          placeholder={intl.formatMessage({
            id: "reportIncident.input.incidentType",
            defaultMessage: "Incident Type",
          })}
          value={incidentType}
          onChangeText={setIncidentType}
        />
        <Text style={styles.title}>
          <FormattedMessage
            id="reportIncident.Location"
            defaultMessage="Incident Type:"
          />
        </Text>
        <Input
          style={styles.input}
          placeholder={intl.formatMessage({
            id: "reportIncident.input.incidentLocation",
            defaultMessage: "Location",
          })}
          value={incidentLocation}
          onChangeText={setIncidentLocation}
        />
        <Text style={styles.title}>
          <FormattedMessage
            id="reportIncident.Description"
            defaultMessage="Description"
          />
        </Text>
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
            <ReadyToPostModal
              onCancel={handleCancelPostIncident}
              onConfirm={handleConfirmPost}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default ReportIncident;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  category: {
    flex: 1,
    marginTop: 16,
  },
  headerText: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    fontSize: 16,
    fontWeight: 400,
    marginBottom: 5,
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
