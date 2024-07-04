import { Text, View } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Alert, StyleSheet } from "react-native";
import { getProfile, updateProfile } from "../api/user";
import { Button, Input } from "../components/atoms";
import { LocationInput, ProfileImageEdit } from "../components/molecules";

import { getReverseGeoCoding } from "../api";
import Edit from "../assets/icons/Edit.svg";

const ProfileDetails = () => {
  const intl = useIntl();
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [projectId, setProjectId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [initialAddress, setInitialAddress] = useState("");
  const [loading, setLoading] = useState(true);

  const handleImageChange = (newImage) => {
    setProfileImage(newImage);
    console.log("newImage:", newImage);
  };

  const handleNameChange = (value) => {
    setName(value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handleContactChange = (value) => {
    setContact(value);
  };

  const fetchProfileData = async () => {
    setLoading(true);
    const profileData = await getProfile();
    const {
      data: { user },
    } = profileData;

    setId(user.id);
    setName(user.name);
    setEmail(user.email);
    setContact(user.phone ?? " ");
    setProjectId(user.project_id);
    setProfileImage(user.picture);
    console.log("picture:", user.picture);
    setLatitude(user.address.lat);
    setLongitude(user.address.lng);

    const addressData = await getReverseGeoCoding(
      user.address.lat,
      user.address.lng
    );
    const fullAddress =
      addressData.street ||
      `${addressData.city}, ${addressData.state}, ${addressData.country}`;
    setInitialAddress(fullAddress);

    setLoading(false);
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleSave = async () => {
    // setUploading(true);

    const profileData = {
      id: id,
      name: name,
      picture: "",
      email: email,
      phone: contact,
      project_id: projectId,
      address: {
        lat: latitude,
        lng: longitude,
      },
      coordinate: {
        lat: latitude,
        lng: longitude,
      },
    };

    const result = await updateProfile(profileData, profileImage);

    console.log("Backend response:", result);
    Alert.alert("Success", "Profile updated successfully");

    // catch (error) {
    //   console.error("Error saving profile:", error);
    //   Alert.alert(
    //     "Error",
    //     "Failed to update profile. Please check the console for more details."
    //   );
    // } finally {
    //   setUploading(false);
    // }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ProfileImageEdit
          image={profileImage}
          onImageChange={handleImageChange}
          icon={Edit}
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
        onChangeText={handleNameChange}
        value={name}
        required={true}
      />
      <Input
        label={intl.formatMessage({
          id: "ProfileDetails.emailinput.labelmessage",
          defaultMessage: "Email *",
        })}
        placeholder={intl.formatMessage({
          id: "ProfileDetails.emailinput.placeholdermessage",
          defaultMessage: "Enter your email",
        })}
        value={email}
        onChangeText={handleEmailChange}
        required={true}
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
        onChangeText={handleContactChange}
      />

      <LocationInput
        latitude={latitude}
        longitude={longitude}
        value={{ address_line1: initialAddress }}
      />

      <View style={styles.buttonContainer}>
        <Button style={styles.button} onPress={handleSave} disabled={uploading}>
          <Text style={styles.buttonText}>
            <FormattedMessage
              id="ProfileDetails.savebutton.Buttonmessage"
              defaultMessage="Save"
            />
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  imageContainer: {
    margin: 30,
    marginLeft: "auto",
    marginRight: "auto",
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  buttonContainer: {
    marginTop: 30,
  },
  buttonText: {
    color: "white",
  },
});
