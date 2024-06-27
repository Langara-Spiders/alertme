import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

import React, { useEffect } from "react";

import { View } from "@gluestack-ui/themed";
import axios from "axios";
import Constants from "expo-constants";
import { StyleSheet } from "react-native";
import { login } from "../api";
import { Button } from "../components/atoms";
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
      <Button onPress={() => promptAsync()}>Login with Google</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    gap: 30,
    paddingBottom: 80,
  },
});

export default Login;
