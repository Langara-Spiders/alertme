import { Text, View } from "@gluestack-ui/themed";

import { StyleSheet } from "react-native";
import { RewardLevel } from "../components/molecules";

const Profile = () => {
  return (
    <View>
      <RewardLevel />
      <Text>Profile</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Profile;
