import { API_BASE_URL, OAUTH_REVOKE_URL } from "./constants";

import axios from "axios";
import { Platform } from "react-native";

const login = async (token) => {
  try {
    const platform = Platform.OS;
    const res = await axios.post(
      `${API_BASE_URL}/users/login?platform=${platform}`,
      {
        token: token,
      }
    );
    return res.data;
  } catch (error) {
    console.error(error.response);
    return error?.response?.data;
  }
};

const logout = async (googleToken) => {
  try {
    await axios.post(`${OAUTH_REVOKE_URL}?token=${googleToken}`);
  } catch (error) {
    console.error(error?.response?.data);
  }
};

export { login, logout };
