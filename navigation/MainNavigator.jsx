import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainContainer from '../pages/MainConatiner';
import Notifications from '../screens/notification/notifications';
import { routes } from '../constants';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
       <Stack.Navigator>
        <Stack.Screen 
          name="Main" 
          component={MainContainer} 
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
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigator;

const screenOptions = {
  headerShown: false
}
