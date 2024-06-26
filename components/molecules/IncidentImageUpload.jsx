import { Alert, CloseIcon, Image, View } from "@gluestack-ui/themed";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const ImagePickerComponent = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
      }
    })();
  }, []);

  const handleAddImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const newImages = result.assets.map((asset) => ({ uri: asset.uri }));
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleUploadImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const newImage = { uri: result.assets[0].uri };
      setImages((prevImages) => [...prevImages, newImage]);
    }
  };

  const handleDeleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const showImagePickerOptions = (index) => {
    Alert.alert(
      "Upload Photo",
      "Choose an option",
      [
        { text: "Take Photo", onPress: () => handleUploadImage(index) },
        { text: "Choose from Gallery", onPress: () => handleAddImage(index) },
        { text: "Cancel", onPress: () => {}, style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  const renderImagePlaceholders = () => {
    const placeholders = [];
    for (let i = 0; i < 3; i++) {
      if (images[i] && typeof images[i].uri === "string") {
        placeholders.push(
          <View key={i} style={styles.imageWrapper}>
            <Image
              source={{ uri: images[i].uri }}
              style={styles.image}
              alt={`Incident image ${i + 1}`}
            />
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteImage(i)}
            >
              <CloseIcon size="sm" color="#fff" />
            </TouchableOpacity>
          </View>
        );
      } else {
        placeholders.push(<View key={i} style={styles.imageWrapper} />);
      }
    }
    return placeholders;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.largeImageBox}
        onPress={() => showImagePickerOptions(0)}
      >
        {images[0] ? (
          <Image source={{ uri: images[0].uri }} style={styles.largeImage} />
        ) : (
          <Camera size={24} />
        )}
      </TouchableOpacity>
      <View style={styles.smallImageStack}>
        <TouchableOpacity
          style={styles.smallImageBox}
          onPress={() => showImagePickerOptions(1)}
        >
          {images[1] ? (
            <Image source={{ uri: images[1].uri }} style={styles.smallImage} />
          ) : (
            <Camera size={24} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.smallImageBox}
          onPress={() => showImagePickerOptions(2)}
        >
          {images[2] ? (
            <Image source={{ uri: images[2].uri }} style={styles.smallImage} />
          ) : (
            <Camera size={24} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ImagePickerComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  largeImageBox: {
    width: 206,
    height: 132,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  largeImage: {
    width: "100%",
    height: "100%",
  },
  smallImageStack: {
    justifyContent: "space-between",
  },
  smallImageBox: {
    width: 126,
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 5,
  },
  smallImage: {
    width: "100%",
    height: "100%",
  },
  deleteButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 15,
    padding: 2,
  },
});
