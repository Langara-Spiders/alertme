import { StyleSheet, View } from 'react-native';

import { Card } from '@gluestack-ui/themed';
import Image from '../../../atoms/Image';
import React from 'react';
import Typography from '../../../atoms/Typography';

const RewardsGreetingCard = (props) => {
  return (
    <Card style={styles.card}>
      <View style={styles.textContainer}>
        <Typography style={styles.levelText}>Level {props.level}</Typography>
        <Typography style={styles.subtitleText}>{props.subtitle?? 'Incident Reported'}</Typography>
        <View style={styles.view2}>
          <View style={styles.viewInside}>
            <Typography style={styles.completedText}>Completed</Typography>
            <Typography style={styles.completedText}>{props.completed ?? '0'}</Typography>
          </View>
          <View style={styles.viewInside}>
            <Typography style={styles.progressText}>Progress</Typography>
            <Typography style={styles.progressText}>{props.progress?? '0'}</Typography>
          </View>
        </View>
      </View>
      <Image
        source={'https://picsum.photos/200/300'}
        alt={props.alt ?? "Level Reward"}
        style={styles.image}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  levelText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  subtitleText: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 5,
  },
  view2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewInside: {
    alignItems: 'center',
  },
  completedText: {
    fontSize: 14,
    color: '#FFF',
    marginBottom: 5,
  },
  progressText: {
    fontSize: 14,
    color: '#FFF',
  },
  image: {
    marginLeft: 10,
  },
});

export default RewardsGreetingCard;
