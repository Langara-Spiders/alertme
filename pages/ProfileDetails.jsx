import { Text, View } from "@gluestack-ui/themed";
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Button, Input } from "../components/atoms";
import { LocationInput, ProfileImageEdit } from "../components/molecules";

import { StyleSheet } from "react-native";
import Edit from "../assets/icons/Edit.svg";

const ProfileDetails = () => {
  const intl = useIntl();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (newImage) => {
    setProfileImage(newImage);
  };

  const handleNameChange = (value) => {
    setName(value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handleImagePress = () => {
    console.log("Image Pressed");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ProfileImageEdit
          image={profileImage}
          onImageChange={handleImageChange}
          icon={Edit}
          style={styles.image}
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
        // value={contact}
      />
      <LocationInput />

      <View style={styles.buttonConatiner}>
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
    backgroundColor: "#FFDABF",
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  buttonConatiner: {
    marginTop: 30,
  },
  buttonText: {
    color: "white",
  },
});
