import { Icon, StarIcon } from "@gluestack-ui/themed";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { routes } from "../constants";
import {
  IncidentDetail,
  Leaderboard,
  NearByActiveIssues,
  Notifications,
  ReportIncident,
} from "../pages";
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
        name={routes.NEARBYACTIVEISSUES}
        component={NearByActiveIssues}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerRight: () => <Icon as={StarIcon} m="$2" w="$4" h="$4" />,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
