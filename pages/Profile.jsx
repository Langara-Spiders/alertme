import {
  Avatar,
  AvatarFallbackText,
  Image,
  Link,
  LinkText,
  Text,
  View,
} from "@gluestack-ui/themed";
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
  const userInfo = getUser();

  const logoutAPICall = async () => {
    const response = await logout(access_token);
    if (response.status == 200) {
      resetUser();
      axios.defaults.headers.common["Authorization"] = "";
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
            <Avatar style={styles.avatar}>
              <AvatarFallbackText>{userInfo.name.charAt(0)}</AvatarFallbackText>
            </Avatar>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{userInfo.name}</Text>
            <Text style={styles.phone}>{userInfo.email}</Text>
          </View>
        </View>
      </View>
      <View style={styles.content1}>
        <ProfileItemsList navigation={props.navigation} />
        {/* <GreatWorkCard /> */}
      </View>
      <View style={styles.content}>
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
    zIndex: 0,
  },
  overlay: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    position: "absolute",
    bottom: -40,
  },
  imageContainer: {
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
  content1: {
    margin: 0,
    marginTop: 30,
  },
  content: {
    flex: 1,
    padding: 16,
    marginTop: 30,
  },
  link: {
    color: "#FF6B00",
    textAlign: "start",
    marginLeft: 16,
    textDecorationLine: "none",
  },
  avatar: {
    width: 100,
    height: 100,
  },
});

export default Profile;
