import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/Home';
import { routes } from '../constants';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name={routes.HOME} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigator;

const screenOptions = {
  headerShown: false
}
