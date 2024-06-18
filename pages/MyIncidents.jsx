import { IncidentsCard, LeaderBoardCard, LoginAsCard, RewardsGreetingCard, RewardsLevelCards, SwitchIconCard }
 from '../components/molecules';
import { ScrollView, StyleSheet } from 'react-native';

import AllIncidents from '../screens/incidents/AllIncidents';
import LevelReward from '../assets/rewardscreen/LevelReward.svg';
import React from 'react';
import { Text } from '@gluestack-ui/themed';

const MyIncidents = () => {
    return (
        <ScrollView>
            <Text>My Incidents</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({})

export default MyIncidents;
