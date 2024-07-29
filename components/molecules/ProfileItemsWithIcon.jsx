import { Text, View } from "@gluestack-ui/themed";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import ArrowRightIcon from "../../assets/icons/profile_icons/arrow_right_icon.png";

const ProfileItemsWithIcon = ({ icon, label, route }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate(route)}
    >
      <View style={styles.iconContainer}>
        <Image
          alt="Profile List Icon"
          style={styles.profileListIcon}
          source={icon}
        />
        <Text style={styles.text}>{label}</Text>
      </View>
      <Image
        alt="Right Arrow"
        style={styles.arrowRight}
        source={ArrowRightIcon}
      />
    </TouchableOpacity>
  );
};

export default ProfileItemsWithIcon;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 24,
    marginTop: 24,
    backgroundColor: "transparent",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileListIcon: {
    width: 24,
    height: 24,
  },
  arrowRight: {
    width: 24,
    height: 24,
  },
  text: {
    marginLeft: 10,
  },
});
