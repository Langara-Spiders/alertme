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

const updateProfile = async (profileData, newImage) => {
  try {
    const formData = new FormData();
    formData.append("user", JSON.stringify(profileData));
    formData.append("picture", newImage);
    const res = await axios.post(`${API_BASE_URL}/users/profile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Backend response:", res.data);

    return res.data;
  } catch (error) {
    console.error(
      "Error updating profile:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export { login, logout, getReward, getProfile, updateProfile };
