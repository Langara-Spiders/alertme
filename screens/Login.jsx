import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

import { Image, Text, View } from "@gluestack-ui/themed";
import React, { useEffect } from "react";

import axios from "axios";
import Constants from "expo-constants";
import { FormattedMessage } from "react-intl";
import { StyleSheet } from "react-native";
import SvgUri from "react-native-svg-uri";
import { login } from "../api";
import black from "../assets/images/Login/black.svg";
import dot from "../assets/images/Login/dot.svg";
import Female from "../assets/images/Login/female.png";
import GoogleIcon from "../assets/images/Login/google.png";
import Male from "../assets/images/Login/male.png";
import semi from "../assets/images/Login/semi.svg";
import star from "../assets/images/Login/star.svg";
import { IconButton } from "../components/atoms";
import { routes } from "../constants";
import { useStore } from "../store";

WebBrowser.maybeCompleteAuthSession();

const Login = (props) => {
  const { navigation } = props;
  const { setUser } = useStore();
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: Constants.expoConfig.iosClientId,
    androidClientId: Constants.expoConfig.androidClientId,
  });

  const loginAPICall = async (googleResponse) => {
    const { id_token, access_token } = googleResponse.params;
    const response = await login(id_token);

    if (!response.error) {
      const { token } = response?.data;
      setUser(token, access_token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      navigation.navigate(routes.MAIN);
    }
  };

  useEffect(() => {
    if (response?.type === "success") {
      loginAPICall(response);
    }
  }, [response]);

  return (
    <View style={styles.loginContainer}>
      <View style={styles.illustrationContainer}>
        <View style={styles.black}>
          <SvgUri source={black} />
        </View>
        <View style={styles.yellow}>
          <View style={styles.imageContainer}>
            <Image source={Male} style={styles.maleImage} />
          </View>
        </View>
        <View style={styles.ellipse}>
          <View style={styles.ellipseImageContainer}>
            <Image source={Female} style={styles.femaleImage} />
          </View>
        </View>
        <View style={styles.star2}>
          <SvgUri source={star} />
        </View>
        <View style={styles.inline}>
          <View style={styles.dot}>
            <SvgUri source={dot} />
          </View>
          <View style={styles.dot}>
            <SvgUri source={dot} />
          </View>
          <View style={styles.dot}>
            <SvgUri source={dot} />
          </View>
          <View style={styles.semi}>
            <SvgUri source={semi} />
          </View>
          <View style={styles.dot}>
            <SvgUri source={dot} />
          </View>
          <View style={styles.star}>
            <SvgUri source={star} />
          </View>
        </View>
      </View>
      <View>
        <View>
          <Text style={styles.content1}>
            <FormattedMessage
              id="loginpage.letsgo.heading"
              defaultMessage="Let's Go!"
            />
          </Text>
          <Text style={styles.content2}>
            <FormattedMessage
              id="loginpage.letsgo.subheading"
              defaultMessage="Signup to AlertMe app to get started quickly to community application"
            />
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            padding: 20,
          }}
        >
          <IconButton
            onPress={() => promptAsync()}
            style={{
              button: {
                backgroundColor: "#131314",
                borderRadius: 50,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              },
            }}
            icon={GoogleIcon}
          >
            <FormattedMessage
              id="loginpage.loginwithgoogle"
              defaultMessage="Sign up with Google"
            />
          </IconButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    gap: 30,
    paddingBottom: 80,
    backgroundColor: "#fff",
  },
  illustrationContainer: {
    position: "relative",
    alignItems: "start",
    top: 0,
    flex: 0.7,
    backgroundColor: "#FFF3EA",
    padding: 20,
  },
  black: {
    position: "absolute",
    left: 50,
    top: 150,
  },
  yellow: {
    position: "absolute",
    width: 165,
    height: 205,
    borderTopLeftRadius: 50,
    top: 50,
    right: 20,
    backgroundColor: "#FFE894",
    overflow: "hidden",
    shadowColor: "#",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 50,
    shadowRadius: 40,
    elevation: 4,
  },
  ellipse: {
    position: "absolute",
    backgroundColor: "#FFC095",
    width: 162,
    height: 162,
    borderRadius: 100,
    bottom: -80,
    left: 20,
    overflow: "hidden",
  },
  imageContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  ellipseImageContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  maleImage: {
    marginLeft: 20,
    marginTop: 30,
    width: 230,
    height: 210,
  },
  femaleImage: {
    marginTop: 20,
    width: 130,
    height: 140,
  },
  inline: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    right: 20,
  },
  dot: {
    marginRight: 5,
  },
  semi: {
    marginRight: 5,
  },
  content1: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#000",
    paddingLeft: 20,
  },
  content2: {
    fontSize: 18,
    color: "#000",
    marginBottom: 20,
    paddingLeft: 20,
  },
  button: {
    marginTop: 20,
    color: "white",
  },
  star: {
    position: "absolute",
    right: 130,
    bottom: 40,
  },
  star2: {
    position: "absolute",
    top: 50,
    left: 20,
  },
});

export default Login;
