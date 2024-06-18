import { Card, Heading, View } from '@gluestack-ui/themed';

import Button from '../../../atoms/buttons/Button';
import Image from '../../../atoms/Image';
import React from 'react';
import { StyleSheet, } from 'react-native';
import Typography  from '../../../atoms/Typography';
import UpvoteButton from '../../../atoms/buttons/UpvoteButton';

const IncidentsCard = (props) => {
  const { color, title, location, date, time, image, upvote, status } = props;

  return (
    <Card style={styles.card}>
      <View style={styles.infoContainer}>
        <View>
          <Button style={styles.statusButton}>{status}</Button>
          <Heading style={styles.title}>{title}</Heading>
          <Typography style={styles.location}>{location}</Typography>
          
          <View style={styles.dateTime}>
            <Typography style={styles.date}>{date},</Typography>
            <Typography style={styles.time}>{time}</Typography>
          </View>
        </View>
      
      
        <View>
          <Image source={'image'} style={styles.image} />
          <UpvoteButton style={styles.upvoteButton}>{upvote??"0"}</UpvoteButton>
        </View>
      </View>
      
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  innercontainer: {
    justifyContent: 'space-between',      
  },
  statusButton: {
    backgroundColor: '#FF9900',
    borderRadius: 5,
    color: '#FFF',
    weight:"70%",
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  location: {
    fontSize: 14,
    color: '#FFF',
  },
  upvoteButton: {
    backgroundColor: '#FF9900',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: '#FFF',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#FFF',
    marginBottom: 5,
  },
  time: {
    fontSize: 12,
    color: '#FFF',
  },
  dateTime: {
    flexDirection: 'row',
    justifyContent: 'start',
  },
});

export default IncidentsCard;
