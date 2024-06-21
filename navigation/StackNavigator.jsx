import * as React from "react";

import { Notifications, ReportIncident } from "../pages";

import IncidentDetail from "../pages/IncidentDetail";
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
      <Stack.Screen
        name={routes.INCIDENTDETAIL}
        component={IncidentDetail}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
