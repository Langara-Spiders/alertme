import { API_BASE_URL, OAUTH_REVOKE_URL } from "./constants";

import axios from "axios";
import { Platform } from "react-native";

const login = async (token) => {
  try {
    const platform = Platform.OS;
    const res = await axios.post(
      `${API_BASE_URL}/users/login?platform=${platform}`,
      { token }
    );
    return res.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

const logout = async (access_token) => {
  console.log(access_token);
  try {
    const res = await axios.post(`${OAUTH_REVOKE_URL}?token=${access_token}`, {
      headers: {},
    });
    return res;
  } catch (error) {
    console.error(error);
    return {};
  }
};

const getReward = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/users/reward`);
    return res.data.data;
  } catch (error) {
    console.error(error.response);
    return {};
  }
};

const getProfile = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/users/profile`);
    return res.data;
  } catch (error) {
    console.error(error.response);
    return {};
  }
};

export { login, logout, getReward, getProfile };
