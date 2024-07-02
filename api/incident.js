import axios from "axios";
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

    for (let i = 0; i < pictures.length; i++) {
      let picture = pictures[i];
      formData.append("file", {
        uri: picture.uri,
        type: picture.type || `image/jpeg`,
        name: picture.fileName || `photo_${i}.jpg`,
      });
    }

    // pictures.forEach((image) => {
    //   formData.append('pictures', {
    //     uri: image.uri,
    //     type: image.type,
    //     name: image.fileName || 'photo.jpg'
    //   });
    // });

    const res = await axios.post(`${API_BASE_URL}/incidents/report`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Success:", response.data);
  } catch (error) {
    console.error(error);
    return {};
  }
};

export { getNearbyIncident, getMyIssues, getCategories, postIssue };
