import { Text, View } from "@gluestack-ui/themed";
import React, { useEffect, useReducer, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Alert, StyleSheet } from "react-native";
import { getProfile, updateProfile } from "../api/user";
import { Button, Input } from "../components/atoms";
import { LocationInput, ProfileImageEdit } from "../components/molecules";

import EditIcon from "../assets/icons/Edit.svg";
import User from "../assets/images/User.png";

const ProfileDetails = () => {
  const intl = useIntl();

  const reducerProfile = (state, action) => {
    switch (action.type) {
      case "CHANGE_PROFILE":
        return action.payload;
      case "CHANGE_NAME":
        return {
          ...state,
          name: action.payload,
        };
      case "CHANGE_PHONE":
        return {
          ...state,
          phone: action.payload,
        };
      case "CHANGE_ADDRESS":
        return {
          ...state,
          address: action.payload,
          coordinates: {
            lat: action.payload?.lat,
            lng: action.payload?.lon,
          },
        };
      case "CHANGE_PROJECTID":
        return {
          ...state,
          project_id: action.payload,
        };
    }
  };

  const fetchProfileData = async () => {
    const response = await getProfile();
    dispatchProfile({
      type: "CHANGE_PROFILE",
      payload: response?.user ?? {},
    });
  };

  const [profile, dispatchProfile] = useReducer(reducerProfile, {});
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleSave = async () => {
    console.log(profile);
    const response = await updateProfile(profile, image);
    dispatchProfile({
      type: "CHANGE_PROFILE",
      payload: response?.user ?? {},
    });
    Alert.alert("Success", "Profile updated successfully");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ProfileImageEdit
          initialImage={profile.picture || User}
          onImageChange={setImage}
          icon={EditIcon}
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
        onChangeText={(text) =>
          dispatchProfile({
            type: "CHANGE_NAME",
            payload: text,
          })
        }
        value={profile.name}
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
        value={profile.phone}
        onChangeText={(text) =>
          dispatchProfile({
            type: "CHANGE_PHONE",
            payload: text,
          })
        }
      />
      <LocationInput
        onSelect={(e) =>
          dispatchProfile({
            type: "CHANGE_ADDRESS",
            payload: e,
          })
        }
        value={profile.address?.truncatedAddress}
      />
      <View style={styles.buttonContainer}>
        <Button style={styles.button} onPress={handleSave}>
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
    marginTop: 70,
    width: "50%",
    margin: "auto",
  },
  buttonText: {
    color: "white",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingIcon: {
    width: 100,
    height: 100,
  },
});
