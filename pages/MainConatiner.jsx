import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import MyIncidents from './MyIncidents';
import Home from './Home';
import Profile from './Profile';
import Rewards from './Rewards';

const homeName = 'Home';
const incidents = 'MyIncidents';
const profile = 'Profile';
const rewards = 'Rewards';

const Tab = createBottomTabNavigator();

const { width } = Dimensions.get('window');
const iconSize = width * 0.06;

const getTabIcon = (routeName, focused) => {
    let iconPath;

    switch (routeName) {
        case homeName:
            iconPath = focused ? require('../assets/navigation-icons/home.svg') : require('../assets/navigation-icons/home-outline.svg');
            break;
        case incidents:
            iconPath = focused ? require('../assets/navigation-icons/incidents.svg') : require('../assets/navigation-icons/incidents-outline.svg');
            break;

        case rewards:
            iconPath = focused ? require('../assets/navigation-icons/rewards.svg') : require('../assets/navigation-icons/rewards-outline.svg');
            break;

        case profile:
            iconPath = focused ? require('../assets/navigation-icons/profile.svg') : require('../assets/navigation-icons/profile-outline.svg');
            break;

    }

    return <Image
        source={iconPath}
        style={[styles.icon, { width: iconSize, height: iconSize }]}
    />;
};

const MainContainer = () => {
    return (

        <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => getTabIcon(route.name, focused),
                tabBarStyle: styles.tabBarStyle, // Apply styles to the tab bar
                tabBarActiveTintColor: 'white', // Active tab icon color
                tabBarInactiveTintColor: 'gray', // Inactive tab icon color
            })}
        >
            <Tab.Screen name={homeName} component={Home} />
            <Tab.Screen name={incidents} component={MyIncidents} />
            <Tab.Screen name={rewards} component={Rewards} />
            <Tab.Screen name={profile} component={Profile} />
        </Tab.Navigator>

    );
}

const styles = StyleSheet.create({
    icon: {
        tintColor: 'black',
    },
    tabBarStyle: {
        backgroundColor: 'black', 
    },
})

export default MainContainer;