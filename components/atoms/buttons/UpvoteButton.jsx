import {ButtonIcon, ChevronUpIcon} from '@gluestack-ui/themed'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import React from 'react';

const UpvoteButton = ({ upvotes, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.iconContainer}>
        <ButtonIcon as={ChevronUpIcon}></ButtonIcon>
        <Text style={styles.text}>Upvotes {upvotes} </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF9900',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default UpvoteButton;

