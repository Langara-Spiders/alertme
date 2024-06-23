import { AddIcon, Icon, Image, View } from "@gluestack-ui/themed";
import { StyleSheet, TouchableOpacity } from "react-native";

const ProfileImageEdit = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: props.image }} style={styles.imageContainer} />
        <TouchableOpacity onPress={props.onPress} style={styles.touch}>
          <Icon as={props.icon ?? AddIcon} style={styles.iconStyle} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileImageEdit;

const styles = StyleSheet.create({
  imageWrapper: {
    position: "relative",
    height: 100,
    width: 100,
  },
  imageContainer: {
    borderRadius: 4,
    width: "100%",
    height: "100%",
  },
  touch: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: 5,
  },
  iconStyle: {
    color: "white",
    fontSize: 20,
    backgroundColor: "black",
    borderRadius: 4,
  },
});
