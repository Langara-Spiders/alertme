import axios from "axios";
import useStore from "../store/useStore";
import { API_BASE_URL } from "./constants";

const getNearbyIncident = async (lat, lng) => {
  try {
    const res = await axios.get(
      `${API_BASE_URL}/incidents/nearby?lat=${lat}&lng=${lng}&r=${5000}`
    );
    return res.data;
  } catch (error) {
    console.error(error.response);
    return {};
  }
};

const getMyIssues = async () => {
  try {
    const { token } = useStore.getState().getUser();
    const res = await axios.get(`${API_BASE_URL}/incidents/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
  } catch (error) {
    console.error(error.response);
    return {};
  }
};

export { getNearbyIncident, getMyIssues };
