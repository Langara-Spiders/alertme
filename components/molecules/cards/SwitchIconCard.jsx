import {Card, View} from '@gluestack-ui/themed'

import React from 'react';
import { StyleSheet } from 'react-native';
import Switch from '../../atoms/Switch';
import Typography from '../../atoms/Typography';

const SwitchIconCard = (props) => {
  return (
    <Card style={styles.card}>
      <View style={styles.textContainer}>
        <Typography variant="h2" style={styles.title}>
          {props.AllowAcessTitle}
        </Typography>
        <Typography variant="body2" style={styles.description}>
          {props.AllowAcessDescription}
        </Typography>
      </View>
      <Switch style={styles.switch} />
    </Card>
  );
};

export default SwitchIconCard;

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#2a2a2a',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
  },
  description: {
    color: '#bbb',
  },
  switch: {
    marginLeft: 10,
  },
});
