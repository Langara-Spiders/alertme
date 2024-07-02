import ImageResizer from "react-native-image-resizer";

const ResizeImage = async (uri) => {
  try {
    const resizedImage = await ImageResizer.createResizedImage(
      uri,
      800, // width
      600, // height
      "JPEG", // format
      80 // quality
    );
    return resizedImage.uri;
  } catch (error) {
    console.error("Error resizing image:", error);
    return uri;
  }
};

export default ResizeImage;
