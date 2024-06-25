import * as React from "react";

import {
  AllIncidentsOrg,
  Home,
  Incidents,
  Profile,
  Rewards,
  SiteIncidentsOrg,
} from "../pages";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import { routes } from "../constants";

// Sample user_type data
// ***************
// For now this is only for testing.
const user_type = {
  type: "staff",
};

const Tab = createBottomTabNavigator();

const TabNavigator = (props) => {
  const renderOrgBottomNav = () => {
    if (user_type.type === "staff") {
      return (
        <>
          <Tab.Screen
            name={routes.ALL_INCIDENTS_ORG}
            component={AllIncidentsOrg}
          />
          <Tab.Screen
            name={routes.SITE_INCIDENTS_ORG}
            component={SiteIncidentsOrg}
          />
        </>
      );
    }
    return (
      <>
        <Tab.Screen name={routes.MY_INCIDENTS} component={Incidents} />
        <Tab.Screen name={routes.REWARDS} component={Rewards} />
      </>
    );
  };

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
      {renderOrgBottomNav()}
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
