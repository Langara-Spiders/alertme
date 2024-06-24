import { Text, View } from "@gluestack-ui/themed";

import { StyleSheet } from "react-native";
import ProfileAppSettingItems from "../components/molecules/ProfileAppSettingItems";

const Profile = () => {
  return (
    <View style={{ position: "absolute", top: 0, right: 0, left: 0 }}>
      <Text>Profile</Text>
      <View>
        <ProfileAppSettingItems />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Profile;
