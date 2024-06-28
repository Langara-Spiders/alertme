import axios from "axios";
import { GEOAPIFY_API_URL } from "./constants";

const getReverseGeoCoding = async (latitude, longitude) => {
  try {
    const res = await axios.get(
      `${GEOAPIFY_API_URL}/reverse?lat=${latitude}&lon=${longitude}&apiKey=28261b8da404459a907d8b450ae64fd1`
    );
    return res?.data?.features?.at(0)?.properties ?? {};
  } catch (error) {
    console.error(error);
    return {};
  }
};

export { getReverseGeoCoding };
