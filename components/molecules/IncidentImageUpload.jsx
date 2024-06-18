import * as ImagePicker from 'expo-image-picker';

import { CloseIcon, DownloadIcon, View } from '@gluestack-ui/themed';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import Image from '../atoms/Image';
import Typography from '../atoms/Typography';

const IncidentImageUpload = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
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
      setImages([...images, ...newImages]);
    }
  };

  const handleUploadImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const newImage = { uri: result.uri };
      setImages([...images, newImage]);
    }
  };

  const handleDeleteImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const renderImagePlaceholders = () => {
    const placeholders = [];
    for (let i = 0; i < 3; i++) {
      if (images[i]) {
        placeholders.push(
          <View key={i} style={styles.imageWrapper}>
            <Image source={images[i].uri} style={styles.image} />
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteImage(i)}>
              <CloseIcon size="sm" color="#fff" />
            </TouchableOpacity>
          </View>
        );
      } else {
        placeholders.push(
          <View key={i} style={styles.imageWrapper} />
        );
      }
    }
    return placeholders;
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.imageContainer}>
        <TouchableOpacity style={styles.imageUpload} onPress={handleAddImage}>
          <DownloadIcon size="sm" color="#fff" />
          <Typography style={styles.imageUploadText}>Add Incident Pictures</Typography>
        </TouchableOpacity>
        {renderImagePlaceholders()}
        <TouchableOpacity style={styles.imageUpload} onPress={handleUploadImage}>
          <Typography style={styles.plusIcon}>+</Typography>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#000',
    borderRadius: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageUpload: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'dotted',
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    margin: 5,
  },
  imageUploadText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
  plusIcon: {
    fontSize: 40,
    color: '#fff',
  },
  imageWrapper: {
    position: 'relative',
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'dotted',
    borderColor: '#fff',
    overflow: 'hidden',
    margin: 5,
    backgroundColor: '#333', 
  },
  image: {
    width: '100%',
    height: '100%',
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    padding: 5,
  },
});

export default IncidentImageUpload;
