import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

import { Text, View } from "@gluestack-ui/themed";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";

import axios from "axios";
import Constants from "expo-constants";
import { FormattedMessage } from "react-intl";
import SvgUri from "react-native-svg-uri";
import { login } from "../api";
import black from "../assets/images/Login/black.svg";
import dot from "../assets/images/Login/dot.svg";
import Ellipse from "../assets/images/Login/Ellipse.svg";
import semi from "../assets/images/Login/semi.svg";
import yellow from "../assets/images/Login/yellow.svg";
import { Button } from "../components/atoms";
import { routes } from "../constants";
import { useStore } from "../store";

WebBrowser.maybeCompleteAuthSession();

const { width, height } = Dimensions.get("window");

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
      // add token to auth headers
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
          <SvgUri source={yellow} />
        </View>
        <View style={styles.ellipse}>
          <SvgUri source={Ellipse} />
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
        <Button onPress={() => promptAsync()} style={styles.button}>
          <Text>
            <FormattedMessage
              id="loginpage.loginwithgoogle"
              defaultMessage="Login with Google"
            />
          </Text>
        </Button>
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
    top: 50,
    right: 20,
  },
  ellipse: {
    position: "absolute",
    bottom: -80,
    left: 20,
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
  },
});

export default Login;
