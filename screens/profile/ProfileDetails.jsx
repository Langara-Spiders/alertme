import { Pressable, Text, View } from "@gluestack-ui/themed";
import React, { useEffect, useReducer, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Alert, StyleSheet } from "react-native";
import { getProfile, updateProfile } from "../../api/user";
import { Button, Input } from "../../components/atoms";
import { LocationInput, ProfileImageEdit } from "../../components/molecules";

import { useNavigation } from "@react-navigation/native";
import SvgUri from "react-native-svg-uri";
import EditIcon from "../../assets/icons/Edit.svg";
import Back_Icon from "../../assets/icons/System_Icons/ArrowLeft.svg";
import User from "../../assets/images/User.png";

const ProfileDetails = () => {
  const intl = useIntl();
  const navigation = useNavigation();

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
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.navigate("Profile")}
          style={styles.iconContainer}
        >
          <SvgUri
            width="24"
            height="24"
            source={Back_Icon}
            style={styles.icon}
          />
        </Pressable>
        <Text style={styles.headerText}>
          <FormattedMessage
            id="profile.ProfileDetails.headerText"
            defaultMessage="Profile Details"
          />
        </Text>
      </View>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: "#F3F4F4",
    opacity: 0.8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  icon: {
    width: 24,
    height: 24,
    textAlign: "center",
  },
  headerText: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
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
    marginTop: 157,
    width: "50%",
    margin: "auto",
  },
  buttonText: {
    color: "white",
  },
});
