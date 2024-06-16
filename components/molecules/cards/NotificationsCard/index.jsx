import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotificationCard = ({ notification, timeAgo }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.notificationText}>{notification}</Text>
      <Text style={styles.timeText}>{timeAgo}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: '#212121', 
    padding: 15,
    margin: 10,
  },
  notificationText: {
    color: '#ffffff', 
    fontSize: 16,
    marginBottom: 5,
  },
  timeText: {
    color: '#b0b0b0', 
    fontSize: 14,
  },
});

export default NotificationCard;
