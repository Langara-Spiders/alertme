import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { StyleSheet, Text, View } from "react-native";
import { getProfile } from "../api/user";
import { Button, Input } from "../components/atoms";
import { LocationInput, ProfileImageEdit } from "../components/molecules";

import { getReverseGeoCoding } from "../api";
import Edit from "../assets/icons/Edit.svg";

const ProfileDetails = () => {
  const intl = useIntl();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [initialAddress, setInitialAddress] = useState("");

  const handleImageChange = (newImage) => {
    setProfileImage(newImage);
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

    setName(user.name);
    setEmail(user.email);
    setContact(user.phone ?? " ");
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

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ProfileImageEdit onImageChange={handleImageChange} icon={Edit} />
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
        onChangeText={handleNameChange}
        value={name}
        required={true}
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
        onChangeText={handleEmailChange}
        required={true}
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
        onChangeText={handleContactChange}
      />
      <LocationInput
        latitude={latitude}
        longitude={longitude}
        value={{ address_line1: initialAddress }}
      />

      <View style={styles.buttonContainer}>
        <Button style={styles.button}>
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
