import { Text, View } from "@gluestack-ui/themed";

import { StyleSheet } from "react-native";
import { GreatWorkCard } from "../components/molecules";
import { ProfileItemsList } from "../components/organisms";

const Profile = () => {
  return (
    <View style={StyleSheet.container}>
      <Text>Profile</Text>
      <View>
        {/* <ProfileAppSettingItems /> */}
        <ProfileItemsList />
        <GreatWorkCard />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default Profile;
