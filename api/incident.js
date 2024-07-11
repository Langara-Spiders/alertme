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

const postIssue = async (report, pictures) => {
  try {
    const formData = new FormData();
    formData.append("report", JSON.stringify(report));
    for (const picture of pictures) formData.append("pictures", picture);
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

export {
  getNearbyIncident,
  getMyIssues,
  upVoteIssue,
  getCategories,
  postIssue,
  getIncidentDetailsForUser,
  getCivilianIssuesForOrg,
  getSiteIssuesForOrg,
};
