import { Icon, StarIcon } from "@gluestack-ui/themed";
import * as React from "react";
import { SafeAreaView } from "react-native";
import {
  About,
  Appearance,
  AppSetting,
  IncidentDetail,
  IncidentDetailOrg,
  IssuesReportedAwards,
  Leaderboard,
  NearByActiveIssues,
  Notifications,
  ProfileDetails,
  ReportIncident,
} from "../pages";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routes } from "../constants";
import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator();

const SafeAreaWrapper = ({ children }) => (
  <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
    {children}
  </SafeAreaView>
);

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={routes.MAP}>
      <Stack.Screen
        name={routes.ROOT_HOME}
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={routes.NOTIFICATIONS}
        options={{ headerShown: false, headerBackTitleVisible: false }}
      >
        {(props) => (
          <SafeAreaWrapper>
            <Notifications {...props} />
          </SafeAreaWrapper>
        )}
      </Stack.Screen>
      <Stack.Screen
        name={routes.REPORT_INCIDENT}
        options={{ headerShown: false, headerBackTitleVisible: false }}
      >
        {(props) => (
          <SafeAreaWrapper>
            <ReportIncident {...props} />
          </SafeAreaWrapper>
        )}
      </Stack.Screen>
      <Stack.Screen
        name={routes.INCIDENT_DETAIL}
        options={{ headerShown: false, headerBackTitleVisible: false }}
      >
        {(props) => (
          <SafeAreaWrapper>
            <IncidentDetail {...props} />
          </SafeAreaWrapper>
        )}
      </Stack.Screen>
      <Stack.Screen
        name={routes.INCIDENT_DETAIL_ORG}
        options={{ headerShown: false, headerBackTitleVisible: false }}
      >
        {(props) => (
          <SafeAreaWrapper>
            <IncidentDetailOrg {...props} />
          </SafeAreaWrapper>
        )}
      </Stack.Screen>
      <Stack.Screen
        name={routes.LEADERBOARD}
        options={{ headerShown: false, headerBackTitleVisible: false }}
      >
        {(props) => (
          <SafeAreaWrapper>
            <Leaderboard {...props} />
          </SafeAreaWrapper>
        )}
      </Stack.Screen>
      <Stack.Screen
        name={routes.APP_SETTING}
        options={{ headerShown: true, headerBackTitleVisible: false }}
      >
        {(props) => (
          <SafeAreaWrapper>
            <AppSetting {...props} />
          </SafeAreaWrapper>
        )}
      </Stack.Screen>
      <Stack.Screen
        name={routes.PROFILE_DETAILS}
        options={{ headerShown: true, headerBackTitleVisible: false }}
      >
        {(props) => (
          <SafeAreaWrapper>
            <ProfileDetails {...props} />
          </SafeAreaWrapper>
        )}
      </Stack.Screen>
      <Stack.Screen
        name={routes.APPEARANCE}
        options={{ headerShown: true, headerBackTitleVisible: false }}
      >
        {(props) => (
          <SafeAreaWrapper>
            <Appearance {...props} />
          </SafeAreaWrapper>
        )}
      </Stack.Screen>
      <Stack.Screen
        name={routes.ABOUT}
        options={{ headerShown: true, headerBackTitleVisible: false }}
      >
        {(props) => (
          <SafeAreaWrapper>
            <About {...props} />
          </SafeAreaWrapper>
        )}
      </Stack.Screen>
      <Stack.Screen
        name={routes.NEARBYACTIVEISSUES}
        options={{
          title: "Nearby Issues",
          headerShown: false,
          headerBackTitleVisible: false,
          headerRight: () => <Icon as={StarIcon} m="$2" w="$4" h="$4" />,
        }}
      >
        {(props) => (
          <SafeAreaWrapper>
            <NearByActiveIssues {...props} />
          </SafeAreaWrapper>
        )}
      </Stack.Screen>
      <Stack.Screen
        name={routes.ISSUESREPORTEDAWARDS}
        options={{
          title: "IssuesReportedAwards",
          headerShown: false,
          headerBackTitleVisible: false,
          headerRight: () => <Icon as={StarIcon} m="$2" w="$4" h="$4" />,
        }}
      >
        {(props) => (
          <SafeAreaWrapper>
            <IssuesReportedAwards {...props} />
          </SafeAreaWrapper>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default StackNavigator;
