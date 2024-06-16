import React, { useState, useEffect } from 'react';
import { Box, Text } from "@gluestack-ui/themed";
import { View, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MainScreen from "../screens/home/MainScreen";

const Home = ({ navigation }) => {
  const route = useRoute();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (route.params?.incidentPosted) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000); 
    }
  }, [route.params]);

  return (
    <View>
      <MainScreen navigation={navigation} />
      {showSuccess && (
        <View style={styles.successCard}>
          <Text style={styles.successText}>Incident Posted Successfully</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  successCard: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    alignItems: 'center',
  },
  successText: {
    fontSize: 18,
  },
});

export default Home;
