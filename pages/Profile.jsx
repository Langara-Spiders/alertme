import { Text, View } from "@gluestack-ui/themed";

import { StyleSheet } from "react-native";
import ProfileAppSettingItems from "../components/molecules/ProfileAppSettingItems";

const Profile = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text>Profile</Text>
      <View>
        <ProfileAppSettingItems />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Profile;
