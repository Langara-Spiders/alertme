import { Image as ImageGS } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";

const Image = (props) => {
  return (
    <ImageGS
      size={props.size ?? "md"}
      source={{ uri: props.source }}
      alt={props.alt}
      height={props.height ?? 100}
      width={props.width ?? 100}
      style={props.style ?? imageDefaultStyle}
    />
  );
};

export default Image;

const imageDefaultStyle = StyleSheet.create({
  image: {
    borderRadius: 50,
    width: 100,
    height: 100,
    objectFit: "cover",
  },
});
