import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MainNavigator } from '../navigation'; 
import Notifications from '../screens/notification/notifications';
import ReportIncident from '../screens/home/ReportIncident/reportIncident';

const Stack = createNativeStackNavigator();

const MainContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Main" 
          component={MainNavigator} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Notifications" 
          component={Notifications}
          options={{
            headerShown: true, 
            headerBackTitleVisible: false, 
            headerTitle: 'Notifications', 
          }}
        />
        <Stack.Screen 
          name="ReportIncident" 
          component={ReportIncident}
          options={{
            headerShown: true, 
            headerBackTitleVisible: false, 
            headerTitle: 'Report Incident', 
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
