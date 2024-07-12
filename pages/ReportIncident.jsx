import * as Location from "expo-location";

import { Pressable, Text, View } from "@gluestack-ui/themed";
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
import { ChevronLeft } from "lucide-react-native";
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
  const [images, setImages] = useState([]);
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
    if (!Object.keys(coords).length) {
      setCoords({
        lat: 0,
        lng: 0,
      });
    }

    const report = {
      category_id: selectedCategory?.id,
      subject: incidentSubject,
      description: incidentDescription,
      coordinates: coords,
      address: {
        address_line1: address?.at(0)?.formatted,
      },
      is_internal_for_org: false,
    };
    const res = await postIssue(report, images);
    const successType = `post-${uniqueId()}`;
    navigation.navigate(routes.HOME, {
      successType,
      coordinates: res?.coordinates,
    });
  };

  useEffect(() => {
    if (address[0]) {
      setCoords({
        lat: address?.at(0)?.lat,
        lng: address?.at(0)?.lon,
      });
    }
  }, [address]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ backgroundColor: "#fff" }}>
          <View style={styles.header}>
            <Pressable onPress={() => navigation.navigate("Home")}>
              <ChevronLeft color="black" size={36} />
            </Pressable>
            <Text style={styles.headerText}>Add Issue</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.title}>
              <FormattedMessage
                id="reportIncident.titleaddpics"
                defaultMessage="Add Issues Pictures*"
              />
            </Text>
            <View style={{ flex: 1 }}>
              <IncidentImageUpload images={images} setImages={setImages} />
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
                defaultMessage: "Issue Type*",
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
                defaultMessage: "Description*",
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
              style={{
                inputbox: {
                  height: 86,
                  marginBottom: 18,
                },
              }}
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
    paddingTop: 30,
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
    marginBottom: 10,
    paddingLeft: 10,
    marginTop: 8,
  },
  textArea: {
    height: 80,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingLeft: 10,
    paddingTop: 10,
  },
});
