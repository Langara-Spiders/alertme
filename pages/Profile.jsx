import { Image, Link, LinkText, Text, View } from "@gluestack-ui/themed";
import { Dimensions, StyleSheet } from "react-native";

import axios from "axios";
import { logout } from "../api";
import ProfileItemsList from "../components/organisms/ProfileItemsList";
import { routes } from "../constants";
import { useStore } from "../store";

const { width: screenWidth } = Dimensions.get("window");

const Profile = (props) => {
  const { navigation } = props;
  const { getUser, resetUser } = useStore();
  const { access_token } = getUser();

  const logoutAPICall = async () => {
    const response = await logout(access_token);
    if (response.status === 200) {
      resetUser();
      axios.defaults.headers.common = {
        Authorization: ``,
      };
      navigation.navigate(routes.LOGIN);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/images/pattern.png")}
          style={styles.background}
          alt="backgroundimage"
        />
        <View style={styles.overlay}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/images/User.png")}
              style={styles.profileImage}
              alt="userimage"
            />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Maya Bergsson</Text>
            <Text style={styles.phone}>+12347483394</Text>
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <ProfileItemsList navigation={navigation} />
        {/* <GreatWorkCard /> */}
      </View>
      <View style={styles.content2}>
        <Link onPress={() => logoutAPICall()}>
          <LinkText style={styles.link}>Logout</LinkText>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 200,
    width: screenWidth,
    position: "relative",
    backgroundColor: "#FFC095",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    width: screenWidth,
    height: 200,
    zIndex: 5,
  },
  overlay: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    position: "absolute",
    bottom: -25,
  },
  imageContainer: {
    backgroundColor: "#FFDABF",
    borderRadius: 10,
    zIndex: 10,
  },
  profileInfo: {
    flexDirection: "column",
    marginLeft: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  phone: {
    fontSize: 14,
    color: "#000",
  },
  content: {
    flex: 1,
    marginTop: 30,
  },
  content2: {
    flex: 1,
    marginTop: 40,
  },
  link: {
    color: "#FF6B00",
    textAlign: "start",
    padding: 20,
    marginLeft: 16,
    textDecorationLine: "none",
  },
});

export default Profile;
