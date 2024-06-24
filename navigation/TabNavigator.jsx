import * as React from "react";

import { Home, Incidents, Profile, Rewards } from "../pages";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import { routes } from "../constants";

const Tab = createBottomTabNavigator();

const TabNavigator = (props) => {
  return (
    <Tab.Navigator
      initialRouteName={routes.HOME}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: styles.tabBarStyle,
      })}
    >
      <Tab.Screen name={routes.HOME} component={Home} />
      <Tab.Screen name={routes.MY_INCIDENTS} component={Incidents} />
      <Tab.Screen name={routes.REWARDS} component={Rewards} />
      <Tab.Screen name={routes.PROFILE} component={Profile} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  icon: {
    tintColor: "black",
  },
  tabBarStyle: {
    // backgroundColor: "black",
  },
});
