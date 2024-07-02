import axios from "axios";
import { Platform } from "react-native";
import { ResizeImage } from "../utils";
import { API_BASE_URL } from "./constants";

const getNearbyIncident = async (lat, lng) => {
  try {
    const res = await axios.get(
      `${API_BASE_URL}/incidents/nearby?lat=${lat}&lng=${lng}&r=${50000}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

const getMyIssues = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/incidents/user`);
    return res.data.data;
  } catch (error) {
    console.error(error.response);
    return {};
  }
};

const getCategories = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/incidents/category`);
    return res.data;
  } catch (error) {
    console.error(error.response);
    return {};
  }
};

const postIssue = async (report, pictures) => {
  console.log("Hi");
  console.log(pictures);
  try {
    const formData = new FormData();
    formData.append("report", JSON.stringify(report));

    for (const picture of pictures) {
      const { uri, type, filename } = picture;
      const name = filename || `photo_${Date.now()}.jpg`;

      const resizedUri = await ResizeImage(uri);

      formData.append("pictures", {
        uri:
          Platform.OS === "ios"
            ? resizedUri.replace("file://", "")
            : resizedUri,
        type: type || "image/jpeg",
        name: name,
      });
    }

    // // Log FormData content for debugging
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    const res = await axios.post(`${API_BASE_URL}/incidents/report`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        // Include your Authorization header if required
        // 'Authorization': 'Bearer YOUR_TOKEN',
      },
    });

    console.log("IS THIS SUCCESS OR NOTTTT");
    console.log("Success:", res.data);
    return res.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export { getNearbyIncident, getMyIssues, getCategories, postIssue };
