import * as React from "react";

import { Text, View } from "@gluestack-ui/themed";
import { Image, Platform, SafeAreaView, StyleSheet } from "react-native";
import {
  CivilianIncidentsOrg,
  Home,
  Profile,
  Rewards,
  SiteIncidentsOrg,
  UserIncidents,
} from "../screens";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FormattedMessage } from "react-intl";
import HomeIcon from "../assets/icons/navigation_icons/home_icon.png";
import HomeIconActive from "../assets/icons/navigation_icons/home_icon_active.png";
import MyReportsIcon from "../assets/icons/navigation_icons/my_reports_icon.png";
import MyReportsIconActive from "../assets/icons/navigation_icons/my_reports_icon_active.png";
import ProfileIcon from "../assets/icons/navigation_icons/profile_icon.png";
import ProfileIconActive from "../assets/icons/navigation_icons/profile_icon_active.png";
import RewardsIcon from "../assets/icons/navigation_icons/rewards_icon.png";
import RewardsIconActive from "../assets/icons/navigation_icons/rewards_icon_active.png";
import SiteIcon from "../assets/icons/navigation_icons/site_icon.png";
import SiteIconActive from "../assets/icons/navigation_icons/site_icon_active.png";
import { routes } from "../constants";
import { useStore } from "../store";

const SafeAreaWrapper = ({ children, backgroundColor }) => (
  <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor }}>
    {children}
  </SafeAreaView>
);

const Tab = createBottomTabNavigator();

const TabNavigator = (props) => {
  const { getUser, palette } = useStore();
  const { isStaff } = getUser();

  const styles = StyleSheet.create({
    icon: {
      width: 28,
      height: 28,
    },
    iconContainer: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: Platform.OS === "ios" ? 30 : 0,
    },
    container: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    tabBarStyle: {
      position: "absolute",
      bottom: 32,
      left: 16,
      right: 16,
      elevation: 5,
      borderRadius: 12,
      borderTopColor: palette.bg2,
      height: 76,
      shadowColor: "gray",
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.5,
      shadowRadius: 10,
      backgroundColor: palette.bg1,
    },
    focusedText: {
      color: "#FF6B00",
      fontSize: 10,
      fontWeight: "bold",
      marginTop: 5,
    },
    defaultText: {
      color: palette.txt1,
      fontSize: 10,
      marginTop: 5,
    },
  });

  return (
    <Tab.Navigator
      initialRouteName={routes.HOME}
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: styles.tabBarStyle,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name={routes.HOME}
        component={Home}
        initialParams={{ isStaff }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Image
                style={[
                  styles.icon,
                  { tintColor: focused ? palette.primary1 : palette.txt1 },
                ]}
                source={focused ? HomeIconActive : HomeIcon}
              />
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
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={styles.iconContainer}>
                  <Image
                    style={[
                      styles.icon,
                      { tintColor: focused ? palette.primary1 : palette.txt1 },
                    ]}
                    source={focused ? MyReportsIconActive : MyReportsIcon}
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
          >
            {(props) => (
              <SafeAreaWrapper backgroundColor={palette.bg1}>
                <CivilianIncidentsOrg {...props} />
              </SafeAreaWrapper>
            )}
          </Tab.Screen>
          <Tab.Screen
            name={routes.SITE_INCIDENTS_ORG}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={styles.iconContainer}>
                  <Image
                    style={[
                      styles.icon,
                      { tintColor: focused ? palette.primary1 : palette.txt1 },
                    ]}
                    source={focused ? SiteIconActive : SiteIcon}
                  />
                  <Text
                    style={focused ? styles.focusedText : styles.defaultText}
                  >
                    <FormattedMessage id="Nav.Site" defaultMessage="Site" />
                  </Text>
                </View>
              ),
            }}
          >
            {(props) => (
              <SafeAreaWrapper backgroundColor={palette.bg1}>
                <SiteIncidentsOrg {...props} />
              </SafeAreaWrapper>
            )}
          </Tab.Screen>
        </>
      ) : (
        <>
          <Tab.Screen
            name={routes.MY_INCIDENTS}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={styles.iconContainer}>
                  <Image
                    style={[
                      styles.icon,
                      { tintColor: focused ? palette.primary1 : palette.txt1 },
                    ]}
                    source={focused ? MyReportsIconActive : MyReportsIcon}
                  />
                  <Text
                    style={focused ? styles.focusedText : styles.defaultText}
                  >
                    <FormattedMessage
                      id="Nav.myIssue"
                      defaultMessage="My Reports"
                    />
                  </Text>
                </View>
              ),
            }}
          >
            {(props) => (
              <SafeAreaWrapper backgroundColor={palette.bg1}>
                <UserIncidents {...props} />
              </SafeAreaWrapper>
            )}
          </Tab.Screen>
          <Tab.Screen
            name={routes.REWARDS}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={styles.iconContainer}>
                  <Image
                    style={[
                      styles.icon,
                      { tintColor: focused ? palette.primary1 : palette.txt1 },
                    ]}
                    source={focused ? RewardsIconActive : RewardsIcon}
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
          >
            {(props) => (
              <SafeAreaWrapper backgroundColor={palette.bg3}>
                <Rewards />
              </SafeAreaWrapper>
            )}
          </Tab.Screen>
        </>
      )}
      <Tab.Screen
        name={routes.PROFILE}
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Image
                style={[
                  styles.icon,
                  { tintColor: focused ? palette.primary1 : palette.txt1 },
                ]}
                source={focused ? ProfileIconActive : ProfileIcon}
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
