import * as React from "react";

import {
  CivilianIncidentsOrg,
  Home,
  Profile,
  Rewards,
  SiteIncidentsOrg,
  UserIncidents,
} from "../pages";

import { Text, View } from "@gluestack-ui/themed";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FormattedMessage } from "react-intl";
import { StyleSheet } from "react-native";
import SvgUri from "react-native-svg-uri";
import accountIcon1 from "../assets/icons/profile-outline.svg";
import accountIcon from "../assets/icons/profile.svg";
import rewards1 from "../assets/icons/rewards-outline.svg";
import rewards from "../assets/icons/rewards.svg";
import { routes } from "../constants";
import { useStore } from "../store";

// Sample user_type data
// ***************
// For now this is only for testing.
const user_type = {
  type: "xx",
};

const Tab = createBottomTabNavigator();

const TabNavigator = (props) => {
  const { getUser } = useStore();
  const { isStaff } = getUser();

  return (
    <Tab.Navigator
      initialRouteName={routes.HOME}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: styles.tabBarStyle,
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name={routes.HOME}
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.container}>
              <SvgUri
                width="28"
                height="28"
                source={focused ? rewards : rewards1}
              />
              <Text style={focused ? styles.focusedText : styles.defaultText}>
                <FormattedMessage id="Nav.rewards" defaultMessage="Home" />
              </Text>
            </View>
          ),
        }}
      />
      {isStaff ? (
        <>
          <Tab.Screen
            name={routes.CIVILIAN_INCIDENTS_ORG}
            component={CivilianIncidentsOrg}
          />
          <Tab.Screen
            name={routes.SITE_INCIDENTS_ORG}
            component={SiteIncidentsOrg}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name={routes.MY_INCIDENTS}
            component={UserIncidents}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={styles.container}>
                  <SvgUri
                    width="28"
                    height="28"
                    source={focused ? rewards : rewards1}
                  />
                  <Text
                    style={focused ? styles.focusedText : styles.defaultText}
                  >
                    <FormattedMessage
                      id="Nav.rewards"
                      defaultMessage="All Issues"
                    />
                  </Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name={routes.REWARDS}
            component={Rewards}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={styles.container}>
                  <SvgUri
                    width="28"
                    height="28"
                    source={focused ? rewards : rewards1}
                  />
                  <Text
                    style={focused ? styles.focusedText : styles.defaultText}
                  >
                    <FormattedMessage
                      id="Nav.rewards"
                      defaultMessage="Rewards"
                    />
                  </Text>
                </View>
              ),
            }}
          />
        </>
      )}
      <Tab.Screen
        name={routes.PROFILE}
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.container}>
              <SvgUri
                width="28"
                height="28"
                source={focused ? accountIcon1 : accountIcon}
              />
              <Text style={focused ? styles.focusedText : styles.defaultText}>
                <FormattedMessage id="Nav.profile" defaultMessage="Profile" />
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default TabNavigator;

const styles = StyleSheet.create({
  icon: {
    tintColor: "black",
  },
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  tabBarStyle: {
    position: "absolute",
    bottom: 25,
    left: 16,
    right: 16,
    elevation: 5,
    borderRadius: 15,
    height: 80,
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    backgroundColor: "#fff",
  },
  focusedText: {
    color: "#FF6B00",
    fontSize: 10,
    fontWeight: 600,
  },
  defaultText: {
    color: "black",
    fontSize: 10,
  },
});
