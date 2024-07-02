import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Alert, StyleSheet, Text, View } from "react-native";
import { getProfile, updateProfile } from "../api/user";
import { Button, Input } from "../components/atoms";
import { LocationInput, ProfileImageEdit } from "../components/molecules";

import Edit from "../assets/icons/Edit.svg";

const ProfileDetails = () => {
  const intl = useIntl();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (newImage) => {
    // console.log("New image selected:", newImage);
    setProfileImage(newImage);
  };

  const handleNameChange = (value) => {
    // console.log("Name changed:", value);
    setName(value);
  };

  const handleEmailChange = (value) => {
    // console.log("Email changed:", value);
    setEmail(value);
  };

  const handleContactChange = (value) => {
    // console.log("Contact changed:", value);
    setContact(value);
  };

  const fetchProfileData = async () => {
    const profileData = await getProfile();
    // console.log("Fetched profile data:", profileData);
    const {
      data: { user },
    } = profileData;
    setName(user.name);
    setEmail(user.email);
    setContact(user.phone ?? " ");
    setProfileImage(user.picture);
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleSave = async () => {
    try {
      setUploading(true);
      // console.log("Saving profile...");

      const profileData = {
        name,
        email,
        contact,
        picture: profileImage,
      };

      // console.log("Profile data to be sent:", profileData);

      const result = await updateProfile(profileData);

      // console.log('Profile update response:', result);

      Alert.alert("Success", "Profile updated successfully");

      //short delay before re-fetching the profile data
      setTimeout(async () => {
        await fetchProfileData();
      }, 1000);
    } catch (error) {
      console.error("Error saving profile:", error);
      Alert.alert(
        "Error",
        "Failed to update profile. Please check the console for more details."
      );
    } finally {
      setUploading(false);
    }
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
          id: "ProfileDeatails.nameinput.labelmessage",
          defaultMessage: "Name *",
        })}
        placeholder={intl.formatMessage({
          id: "ProfileDeatails.nameinput.placeholdermessage",
          defaultMessage: "Enter your name",
        })}
        onChange={handleNameChange}
        value={name}
      />
      <Input
        label={intl.formatMessage({
          id: "ProfileDeatails.emailinput.labelmessage",
          defaultMessage: "Email *",
        })}
        placeholder={intl.formatMessage({
          id: "ProfileDeatails.emailinput.placeholdermessage",
          defaultMessage: "Enter your email ",
        })}
        value={email}
        onChange={handleEmailChange}
      />
      <Input
        label={intl.formatMessage({
          id: "ProfileDeatails.contactinput.labelmessage",
          defaultMessage: "Contact Number",
        })}
        placeholder={intl.formatMessage({
          id: "ProfileDeatails.contactinput.placeholdermessage",
          defaultMessage: "Enter your number",
        })}
        value={contact}
        onChange={handleContactChange}
      />
      <LocationInput />

      <View style={styles.buttonContainer}>
        <Button style={styles.button} onPress={handleSave} disabled={uploading}>
          <Text style={styles.buttonText}>
            <FormattedMessage
              id="ProfileDeatails.savebutton.Buttonmessage"
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
