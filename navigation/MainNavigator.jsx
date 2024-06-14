import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainContainer from '../pages/MainConatiner';
import { routes } from '../constants';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <MainContainer />
    </NavigationContainer>
  )
}

export default MainNavigator;

const screenOptions = {
  headerShown: false
}
