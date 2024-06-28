import * as Location from "expo-location";

import {
  ArrowLeftIcon,
  Icon,
  Pressable,
  Text,
  View,
} from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { getCategories, getReverseGeoCoding, postIssue } from "../api";
import { Button, Input } from "../components/atoms";
import {
  CategoriesModal,
  IncidentImageUpload,
  LocationInput,
  ReadyToPostModal,
} from "../components/molecules";

import { useNavigation } from "@react-navigation/native";
import { uniqueId } from "lodash";
import { routes } from "../constants";

const user_type = {
  type: "user",
};

const ReportIncident = () => {
  const intl = useIntl();
  const [address, setAddress] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [incidentSubject, setIncidentSubject] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({});
  const [coords, setCoords] = useState({});
  const [incidentDescription, setIncidentDescription] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    getCategoriesAPICall();
  }, []);

  const getCategoriesAPICall = async () => {
    const response = await getCategories();
    setCategoryList(response?.data ?? []);
  };

  const changeAddress = async () => {
    const { latitude, longitude } = await getLocation();
    setCoords({
      lat: latitude,
      lng: longitude,
    });
    const response = await getReverseGeoCoding(latitude, longitude);
    setAddress(response);
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const { coords } = location ?? {};
    return coords ?? {};
  };

  const handlePostIncident = () => {
    setShowConfirmation(true);
  };

  const handleCancelPostIncident = () => {
    setShowConfirmation(false);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleConfirmPost = async () => {
    const report = {
      category_id: selectedCategory?.id,
      subject: incidentSubject,
      description: incidentDescription,
      coordinate: coords,
      address: {
        address_line1: "",
      },
      is_internal_for_org: false,
    };
    const res = await postIssue(report);
    const successType = `post-${uniqueId()}`;
    navigation.navigate(routes.HOME, {
      successType,
      coordinate: res?.coordinate,
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                  defaultMessage="Issue Category:"
                />
              </Text>
              <CategoriesModal
                selectedCategory={selectedCategory}
                categoriesList={categoryList}
                onSelectCategory={handleCategorySelect}
              />
            </View>
            <Input
              label={intl.formatMessage({
                id: "reportIncident.inputLabel.incidentType",
                defaultMessage: "Issue Type *",
              })}
              placeholder={intl.formatMessage({
                id: "reportIncident.inputPlaceholder.incidentSubject",
                defaultMessage: "Issue Subject",
              })}
              value={incidentSubject}
              onChange={(text) => {
                setIncidentSubject(text);
              }}
            />
            <LocationInput value={address} onChange={changeAddress} />
            <Input
              label={intl.formatMessage({
                id: "reportIncident.description",
                defaultMessage: "Description *",
              })}
              placeholder={intl.formatMessage({
                id: "reportIncident.input.incidentDescription",
                defaultMessage: "Issue Description",
              })}
              value={incidentDescription}
              onChange={(text) => {
                setIncidentDescription(text);
              }}
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
      </ScrollView>
    </KeyboardAvoidingView>
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
  },
  headerText: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    fontSize: 16,
    fontWeight: "400",
    color: "black",
    marginLeft: 10,
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
