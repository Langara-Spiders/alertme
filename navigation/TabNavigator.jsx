import * as React from "react";

import { Text, View } from "@gluestack-ui/themed";
import {
  CivilianIncidentsOrg,
  Home,
  Profile,
  Rewards,
  SiteIncidentsOrg,
  UserIncidents,
} from "../pages";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { StyleSheet, TouchableOpacity } from "react-native";
import SvgUri from "react-native-svg-uri";
import home1 from "../assets/icons/home-out.svg";
import home from "../assets/icons/home.svg";
import myIssue1 from "../assets/icons/MyIssue-Outline.svg";
import myIssue from "../assets/icons/MyIssues.svg";
import accountIcon1 from "../assets/icons/profile-outline.svg";
import accountIcon from "../assets/icons/profile.svg";
import rewards1 from "../assets/icons/rewards-outline.svg";
import rewards from "../assets/icons/rewards.svg";
import siteIssue1 from "../assets/icons/siteIssues-outline.svg";
import siteIssue from "../assets/icons/siteIssues.svg";
import { routes } from "../constants";
import { useStore } from "../store";
import {
  initializeSound,
  playBottomNavSound,
  releaseSound,
} from "../utils/SoundManager";

const Tab = createBottomTabNavigator();

const TabNavigator = (props) => {
  const { getUser } = useStore();
  const { isStaff } = getUser();

  useEffect(() => {
    initializeSound();
    return () => {
      releaseSound();
    };
  }, []);

  return (
    <Tab.Navigator
      initialRouteName={routes.HOME}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: styles.tabBarStyle,
        tabBarShowLabel: false,
        tabBarButton: (props) => (
          <TouchableOpacity
            {...props}
            onPress={(e) => {
              props.onPress(e);
              playBottomNavSound();
            }}
          />
        ),
      })}
    >
      <Tab.Screen
        name={routes.HOME}
        component={Home}
        initialParams={{ isStaff }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[styles.container, focused && styles.focusedContainer]}
            >
              <SvgUri width="28" height="28" source={focused ? home1 : home} />
              <Text style={focused ? styles.focusedText : styles.defaultText}>
                <FormattedMessage id="Nav.home" defaultMessage="Home" />
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
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={[styles.container, focused && styles.focusedContainer]}
                >
                  <SvgUri
                    width="28"
                    height="28"
                    source={focused ? myIssue1 : myIssue}
                  />
                  <Text
                    style={focused ? styles.focusedText : styles.defaultText}
                  >
                    <FormattedMessage
                      id="Nav.Civilian"
                      defaultMessage="Civilian"
                    />
                  </Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name={routes.SITE_INCIDENTS_ORG}
            component={SiteIncidentsOrg}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={[styles.container, focused && styles.focusedContainer]}
                >
                  <SvgUri
                    width="28"
                    height="28"
                    source={focused ? siteIssue1 : siteIssue}
                  />
                  <Text
                    style={focused ? styles.focusedText : styles.defaultText}
                  >
                    <FormattedMessage id="Nav.Site" defaultMessage="Site" />
                  </Text>
                </View>
              ),
            }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name={routes.MY_INCIDENTS}
            component={UserIncidents}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={[styles.container, focused && styles.focusedContainer]}
                >
                  <SvgUri
                    width="28"
                    height="28"
                    source={focused ? myIssue1 : myIssue}
                  />
                  <Text
                    style={focused ? styles.focusedText : styles.defaultText}
                  >
                    <FormattedMessage
                      id="Nav.myIssue"
                      defaultMessage="My Issues"
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
                <View
                  style={[styles.container, focused && styles.focusedContainer]}
                >
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
            <View
              style={[styles.container, focused && styles.focusedContainer]}
            >
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
    width: "auto",
    height: "auto",
  },
  focusedContainer: {
    backgroundColor: "#FFF3EA",
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarStyle: {
    position: "absolute",
    bottom: 15,
    left: 16,
    right: 16,
    elevation: 5,
    borderRadius: 15,
    height: 75,
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
