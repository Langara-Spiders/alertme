import { Text, View } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { LocationInput, ProfileImageEdit } from "../../components/molecules";

import SvgUri from "react-native-svg-uri";
import { updateProfile } from "../../api/user";
import Camera from "../../assets/icons/Camera.svg";
import ConfirmedHazard from "../../assets/icons/map_markers/conf_hazard_icon.svg";
import ArrowLeft from "../../assets/icons/System_Icons/ArrowLeft.svg";
import RegistrationUser from "../../assets/images/RegistrationUser.png";
import { Input } from "../../components/atoms";

const Registration = (props) => {
  const intl = useIntl();

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 });
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(!!name && !!profileImage && !!location);
    console.log("name", name);
    console.log("profileImage", profileImage);
    console.log("location", location);
  }, [name, profileImage, location]);

  const handleLocationSelect = (location) => {
    console.log("location from registration:", location);
    setLocation(location.truncatedAddress);
    setFullAddress(location.fullAddress);
    setCoordinates({
      lat: location.lat,
      lon: location.lon,
    });
  };

  // ***************** to save the informtion of the user *****************
  const onSubmit = async () => {
    console.log("button pressed");

    const addressParts = fullAddress.split(", ");
    const address = {
      street_address: addressParts[0] || "",
      city: addressParts[1] || "",
      province: addressParts[2] || "",
      country: addressParts[3] || "",
      postal_code: "",
    };
    const user = {
      name,
      phone: contact,
      address: {
        lat: coordinates.lat,
        lng: coordinates.lon,
      },
      coordinates: {
        lat: coordinates.lat,
        lng: coordinates.lon,
      },
    };
    console.log("user 68 line from reg:", user);
    const result = await updateProfile(user, profileImage);
    console.log("result from reg:", result);
    if (result) {
      Alert.alert("Success", "Profile updated successfully");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <SvgUri source={ConfirmedHazard} height={40} width={40} />
      </View>
      <View>
        <Text style={styles.text1}>
          <FormattedMessage
            id="Signup.Registration.heading"
            defaultMessage="User Registration"
          />
        </Text>
        <Text style={styles.text2}>
          <FormattedMessage
            id="Signup.Registration.subheading"
            defaultMessage="Please add your basic details below"
          />
        </Text>
      </View>
      <View>
        <View style={styles.imageContainer}>
          <ProfileImageEdit
            initialImage={RegistrationUser}
            icon={Camera}
            onImageChange={setProfileImage}
          />
        </View>
        <Input
          label={intl.formatMessage({
            id: "ProfileDetails.nameinput.labelmessage",
            defaultMessage: "Name *",
          })}
          placeholder={intl.formatMessage({
            id: "ProfileDetails.nameinput.placeholdermessage",
            defaultMessage: "Enter your name",
          })}
          required={true}
          value={name}
          onChangeText={setName}
        />
        <Input
          label={intl.formatMessage({
            id: "ProfileDetails.contactinput.labelmessage",
            defaultMessage: "Contact Number",
          })}
          placeholder={intl.formatMessage({
            id: "ProfileDetails.contactinput.placeholdermessage",
            defaultMessage: "Enter your number",
          })}
          value={contact}
          onChangeText={setContact}
        />
        <LocationInput
          value={{ address_line1: location }}
          onSelect={handleLocationSelect}
        />
      </View>

      <View style={styles.bothButtons}>
        <TouchableOpacity style={styles.touch}>
          <SvgUri
            source={ArrowLeft}
            height={30}
            width={30}
            style={styles.touchIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.touchcontinue, !isValid && styles.disabledButton]}
          disabled={!isValid}
          onPress={onSubmit}
        >
          <Text style={[styles.continueText, !isValid && styles.disabledText]}>
            <FormattedMessage
              id="Signup.Registration.button"
              defaultMessage="Continue"
            />
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Registration;

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 20,
  },
  text1: {
    fontSize: 30,
    fontWeight: "bold",
    multiline: true,
  },
  text2: {
    fontSize: 18,
    multiline: true,
  },
  imageContainer: {
    marginRight: "auto",
    width: 100,
    height: 100,
  },
  touch: {
    backgroundColor: "#F3F4F4",
    borderRadius: 10,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginTop: 20,
    bottom: 0,
  },
  touchcontinue: {
    backgroundColor: "#FF6B00",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginTop: 20,
    bottom: 0,
    width: 100,
  },
  disabledButton: {
    backgroundColor: "#DBDDDE",
  },
  continueText: {
    color: "white",
  },
  disabledText: {
    color: "#AAB0B2",
  },
  bothButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
