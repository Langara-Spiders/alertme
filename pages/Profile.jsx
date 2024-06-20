import { Text, View } from "@gluestack-ui/themed";

import React from "react";
import { StyleSheet } from "react-native";
import { ProfileGreeting } from "../components/molecules";

const Profile = () => {
  return (
    <View>
      <Text>Profile</Text>
      <ProfileGreeting name="ohn" />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Profile;
