import * as ImagePicker from "expo-image-picker";

import { Image, View } from "@gluestack-ui/themed";
import { Camera, X as CloseIcon } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";

const ImageUploadButton = ({ onImageChange, icon }) => {
  const [image, setImage] = useState(null);

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
    <View style={styles.imageWrapper}>
      {image ? (
        <>
          <Image source={{ uri: image }} style={styles.image} />
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteImage}
          >
            <CloseIcon size={20} color="#fff" />
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleImagePress}
        >
          <Camera size={24} color="#ccc" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ImageUploadButton;

const styles = StyleSheet.create({
  imageWrapper: {
    position: "relative",
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  uploadButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  deleteButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 15,
    padding: 5,
  },
});
