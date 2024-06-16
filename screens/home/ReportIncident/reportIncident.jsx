import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const ReportIncident = () => {
  const [images, setImages] = useState([]);
  const [incidentCategory, setIncidentCategory] = useState('');
  const [incidentType, setIncidentType] = useState('');
  const [incidentLocation, setIncidentLocation] = useState('');
  const [incidentDescription, setIncidentDescription] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigation = useNavigation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImages([...images, result.uri]);
    }
  };

  const handlePostIncident = () => {
    setShowConfirmation(true);
  };

  const handleConfirmPost = (confirm) => {
    if (confirm) {
      // Logic to handle posting the incident
      console.log({
        images,
        incidentCategory,
        incidentType,
        incidentLocation,
        incidentDescription,
      });
      // Navigate back to Home and show success message
      navigation.navigate('Home', { incidentPosted: true });
    } else {
      setShowConfirmation(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report an Incident</Text>

      <View style={styles.imagePicker}>
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.image} />
        ))}
        {images.length < 3 && (
          <Button title="Add Image" onPress={pickImage} />
        )}
      </View>

      <View style={styles.categoryButtons}>
        <TouchableOpacity
          style={[styles.button, incidentCategory === 'Category1' && styles.selectedButton]}
          onPress={() => setIncidentCategory('Category1')}
        >
          <Text style={styles.buttonText}>Category 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, incidentCategory === 'Category2' && styles.selectedButton]}
          onPress={() => setIncidentCategory('Category2')}
        >
          <Text style={styles.buttonText}>Category 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, incidentCategory === 'Category3' && styles.selectedButton]}
          onPress={() => setIncidentCategory('Category3')}
        >
          <Text style={styles.buttonText}>Category 3</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Incident Type"
        value={incidentType}
        onChangeText={setIncidentType}
      />

      <TextInput
        style={styles.input}
        placeholder="Incident Location"
        value={incidentLocation}
        onChangeText={setIncidentLocation}
      />

      <TextInput
        style={styles.textArea}
        placeholder="Incident Description"
        value={incidentDescription}
        onChangeText={setIncidentDescription}
        multiline
      />

      <Button title="Post Incident" onPress={handlePostIncident} />

      {showConfirmation && (
        <View style={styles.confirmationCard}>
          <Text style={styles.confirmationText}>Ready to post the Incident?</Text>
          <View style={styles.confirmationButtons}>
            <TouchableOpacity
              style={styles.confirmationButton}
              onPress={() => handleConfirmPost(true)}
            >
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmationButton}
              onPress={() => handleConfirmPost(false)}
            >
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default ReportIncident;
