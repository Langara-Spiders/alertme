import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { routes } from "../constants";
import { Notifications, ReportIncident } from "../pages";
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
          headerShown: true,
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
