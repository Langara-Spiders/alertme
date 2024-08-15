import {
  Avatar,
  AvatarFallbackText,
  Image,
  Link,
  LinkText,
  Text,
  View,
} from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { getProfile, logout } from "../../api";

import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { FormattedMessage } from "react-intl";
import ProfileItemsList from "../../components/organisms/ProfileItemsList";
import { routes } from "../../constants";
import { useStore } from "../../store";
import Loader from "../Loader";

const { width: screenWidth } = Dimensions.get("window");

const Profile = (props) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const { getUser, resetUser, palette } = useStore();
  const [profileImg, setProfileImg] = useState("");
  const { access_token } = getUser();
  const userInfo = getUser();

  const logoutAPICall = () => {
    logout(access_token)
      .then((response) => {
        if (response.status == 200) {
          resetUser();
          axios.defaults.headers.common["Authorization"] = "";
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        navigation.reset({ index: 1, routes: [{ name: routes.HOME }] });
        navigation.navigate(routes.LOGIN);
      });
  };

  const fetchProfileData = async () => {
    const response = await getProfile();
    setProfileImg(response?.user?.picture);
  };

  useEffect(() => {
    fetchProfileData();
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) return <Loader />;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.bg1,
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
      paddingHorizontal: 30,
      paddingVertical: 20,
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
      marginTop: 48,
    },
    content: {
      flex: 1,
      padding: 16,
      marginTop: 48,
    },
    link: {
      color: "#FF6B00",
      textAlign: "start",
      marginLeft: 16,
      textDecorationLine: "none",
      fontWeight: "600",
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 16,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/pattern.png")}
          style={styles.background}
          alt="backgroundimage"
        />
        <View style={styles.overlay}>
          <View style={styles.imageContainer}>
            {profileImg ? (
              <Image style={styles.avatar} source={{ uri: profileImg }} />
            ) : (
              <Avatar style={styles.avatar}>
                <AvatarFallbackText>
                  {userInfo.name.charAt(0)}
                </AvatarFallbackText>
              </Avatar>
            )}
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
          <LinkText style={styles.link}>
            <FormattedMessage id="logout" defaultMessage="Logout" />
          </LinkText>
        </Link>
      </View>
    </View>
  );
};

export default Profile;
