import * as Location from "expo-location";

import { Pressable, Text, View } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import {
  Image,
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
import SvgUri from "react-native-svg-uri";
import Back_Icon from "../assets/icons/System_Icons/Back_Icon_Filled.svg";
import LoadingGif from "../assets/loading.gif";
import { routes } from "../constants";

const user_type = {
  type: "user",
};

const ReportIncident = () => {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({});
  const [selectedAddress, setSelectedAddress] = useState({});
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
    setLoading(true);
    const report = {
      category_id: selectedCategory?.id,
      subject: incidentSubject,
      description: incidentDescription,
      coordinates: {
        lat: selectedAddress?.lat,
        lng: selectedAddress?.lon,
      },
      address: selectedAddress,
      is_internal_for_org: false,
    };

    const res = await postIssue(report, images);
    setLoading(false);

    const successType = `post-${uniqueId()}`;
    navigation.navigate(routes.HOME, {
      successType,
      coordinates: res?.coordinates,
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Image
          source={LoadingGif}
          style={styles.loadingIcon}
          alt="loader image"
        />
        <Text>Posting...</Text>
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.navigate("Home")}
          style={styles.iconContainer}
        >
          <SvgUri
            width="24"
            height="24"
            source={Back_Icon}
            style={styles.icon}
          />
        </Pressable>
        <Text style={styles.headerText}>Create Report</Text>
      </View>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          enabled
        >
          <ScrollView
            style={{
              marginBottom: 50,
            }}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <Text style={styles.title}>
              <FormattedMessage
                id="reportIncident.titleaddpics"
                defaultMessage="Add Pictures*"
              />
            </Text>
            <View style={{ flex: 1 }}>
              <IncidentImageUpload images={images} setImages={setImages} />
            </View>
            <View style={styles.category}>
              <Text style={styles.title}>
                <FormattedMessage
                  id="reportIncident.categories"
                  defaultMessage="Category*"
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
                defaultMessage: "Subject*",
              })}
              placeholder={intl.formatMessage({
                id: "reportIncident.inputPlaceholder.incidentSubject",
                defaultMessage: "Enter subject",
              })}
              value={incidentSubject}
              onChangeText={(text) => {
                setIncidentSubject(text);
              }}
            />
            <LocationInput
              value={address}
              onChangeText={changeAddress}
              onSelect={(e) => setSelectedAddress(e)}
            />
            <Input
              label={intl.formatMessage({
                id: "reportIncident.description",
                defaultMessage: "Description*",
              })}
              placeholder={intl.formatMessage({
                id: "reportIncident.input.incidentDescription",
                defaultMessage: "Enter Description",
              })}
              value={incidentDescription}
              onChangeText={(text) => {
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
          </ScrollView>
        </KeyboardAvoidingView>

        <Button
          style={{
            button: styles.postButton,
          }}
          onPress={handlePostIncident}
        >
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
    paddingTop: 30,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F3F4F4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  icon: {
    width: 24,
    height: 24,
    opacity: 0.5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
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
  loadingContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  postButton: {
    position: "fixed",
    left: 0,
    bottom: 40,
  },
  loadingIcon: {
    width: 100,
    height: 100,
  },
});
