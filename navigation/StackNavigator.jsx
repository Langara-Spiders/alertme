import * as React from "react";

import {
  AppSetting,
  IncidentDetail,
  Leaderboard,
  Notifications,
  ReportIncident,
} from "../pages";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routes } from "../constants";
import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator();

const StackNavigator = (props) => {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
      initialRouteName={routes.MAP}
    >
      <Stack.Screen
        name={routes.ROOT_HOME}
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={routes.NOTIFICATIONS}
        component={Notifications}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name={routes.REPORT_INCIDENT}
        component={ReportIncident}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name={routes.INCIDENT_DETAIL}
        component={IncidentDetail}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name={routes.LEADERBOARD}
        component={Leaderboard}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name={routes.APP_SETTING}
        component={AppSetting}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
