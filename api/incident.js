import axios from "axios";
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

export { getNearbyIncident };
