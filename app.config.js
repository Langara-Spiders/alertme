import "dotenv/config";

export default ({ config }) => {
  // assign environment variables
  config.android.config.googleMaps.apiKey = process.env.GOOGLE_MAPS_API_KEY;
  config.ios.config.googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
  return {
    ...config,
    extra: {
      API_URL: process.env.API_URL,
      API_KEY: process.env.API_KEY,
    },
  };
};
