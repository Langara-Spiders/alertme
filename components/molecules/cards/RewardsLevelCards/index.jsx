import { Card, Image } from '@gluestack-ui/themed';
import { StyleSheet, View } from 'react-native';

import LevelReward from '../../../assets/rewardscreen/LevelReward.svg';
import React from 'react';
import Typography from '../../../atoms/Typography';

const RewardsGreetingCard = (props) => {
  return (
    <Card style={styles.card}>
      <View style={styles.textContainer}>
        <Typography style={styles.levelText}>Level {props.level}</Typography>
        <Typography style={styles.subtitleText}>{props.subtitle}</Typography>
        <Typography style={styles.completedText}>Completed {props.completed}</Typography>
        <Typography style={styles.progressText}>Progress {props.progress}</Typography>
      </View>
      <Image
        source={LevelReward}
        style={styles.image}
        width={100}
        height={100}
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
