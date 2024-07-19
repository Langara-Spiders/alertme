import axios from "axios";
import { API_BASE_URL } from "./constants";

// API LOGICS FOR USER END
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

const getMyIssues = async (lat, lng, filter) => {
  try {
    const filterQuery = filter ? `filter_by=${filter.toUpperCase()}` : "";
    const res = await axios.get(
      `${API_BASE_URL}/incidents/user?${filterQuery}&lat=${lat}&lng=${lng}`
    );
    return res.data.data;
  } catch (error) {
    console.error(error.response);
    return {};
  }
};

const getIncidentDetailsForUser = async (lat, lng, id) => {
  try {
    const res = await axios.get(
      `${API_BASE_URL}/incidents/report?lat=${lat}&lng=${lng}&id=${id}`
    );
    return res.data.data;
  } catch (error) {
    console.error(error.response);
    return {};
  }
};

const getCategories = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/incidents/categories`);
    return res.data;
  } catch (error) {
    console.error(error.response);
    return {};
  }
};

const getMimeType = (fileName) => {
  const extension = fileName.split(".").pop().toLowerCase();
  switch (extension) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    case "bmp":
      return "image/bmp";
    case "webp":
      return "image/webp";
    case "heic":
    case "heif":
      return "image/heif";
    // Add more cases as needed in future..
    default:
      return "application/octet-stream"; // Default binary type, any image will be sent in binary format
  }
};

const postIssue = async (report, pictures) => {
  try {
    const formData = new FormData();
    formData.append("report", JSON.stringify(report));

    for (const picture of pictures) {
      const fileName = picture.name || `photo_${Date.now()}`;
      const mimeType = picture.type || getMimeType(fileName);

      const file = {
        uri: picture.uri,
        type: mimeType, // MIME type of the file
        name: fileName,
      };
      formData.append("pictures", file);
    }

    const res = await axios.post(`${API_BASE_URL}/incidents/report`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

const upVoteIssue = async (id) => {
  try {
    const res = await axios.put(`${API_BASE_URL}/incidents/upvote?id=${id}`);
    return res.data.data;
  } catch (error) {
    console.error(error.response);
    return {};
  }
};

// API LOGICS FOR ORG END

const getCivilianIssuesForOrg = async (filter) => {
  try {
    const filterQuery = filter ? `?filter_by=${filter.toUpperCase()}` : "";
    const res = await axios.get(
      `${API_BASE_URL}/incidents/site/user${filterQuery}`
    );
    return res.data.data;
  } catch (error) {
    console.error(error.response);
    return {};
  }
};

const getSiteIssuesForOrg = async (filter) => {
  try {
    const filterQuery = filter ? `?filter_by=${filter.toUpperCase()}` : "";
    const res = await axios.get(
      `${API_BASE_URL}/incidents/site/org${filterQuery}`
    );
    return res.data.data;
  } catch (error) {
    console.error(error.response);
    return {};
  }
};

const updateIncidentStatus = async (id, status) => {
  try {
    const res = await axios.put(
      `${API_BASE_URL}/incidents/site/user?id=${id}&status=${status}`
    );
    console.log("WHILE", status);
    console.log(id);
    console.log(res);
    return res.data.data;
  } catch (error) {
    console.error(error.response);
    return {};
  }
};

export {
  getNearbyIncident,
  getMyIssues,
  upVoteIssue,
  getCategories,
  postIssue,
  getIncidentDetailsForUser,
  getCivilianIssuesForOrg,
  getSiteIssuesForOrg,
  updateIncidentStatus,
};
