import * as ImagePicker from "expo-image-picker";

import { AddIcon, CloseIcon, Image, View } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";

import SvgUri from "react-native-svg-uri";
import User from "../../assets/images/User.png";

const ProfileImageEdit = ({ image: initialImage, onImageChange, icon }) => {
  const [image, setImage] = useState(initialImage);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need gallery permissions to make this work!");
      }
    })();
  }, []);

  const handleImagePress = () => {
    Alert.alert(
      "Upload Photo",
      "Choose an option",
      [
        {
          text: "Take Photo",
          onPress: async () => {
            const { status } =
              await ImagePicker.requestCameraPermissionsAsync();
            if (status !== "granted") {
              alert("Sorry, we need camera permissions to make this work!");
              return;
            }

            const result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            });

            if (!result.canceled) {
              const selectedImage = result.assets
                ? result.assets[0].uri
                : result.uri;
              setImage(selectedImage);
              if (onImageChange) onImageChange(selectedImage);
            }
          },
        },
        {
          text: "Choose from Gallery",
          onPress: async () => {
            const { status } =
              await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
              alert("Sorry, we need gallery permissions to make this work!");
              return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            });

            if (!result.canceled) {
              const selectedImage = result.assets
                ? result.assets[0].uri
                : result.uri;
              setImage(selectedImage);
              if (onImageChange) onImageChange(selectedImage);
            }
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const handleDeleteImage = () => {
    setImage(null);
    if (onImageChange) onImageChange(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={image ? { uri: image } : User}
          style={styles.imageContainer}
        />
        {image && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteImage}
          >
            <SvgUri source={CloseIcon} color="#fff" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={handleImagePress} style={styles.touch}>
          <SvgUri
            source={icon ?? AddIcon}
            width="20"
            height="20"
            style={styles.iconStyle}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileImageEdit;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
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
    bottom: 4,
    right: 4,
    backgroundColor: "white",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  iconStyle: {
    zIndex: 1,
  },
});
