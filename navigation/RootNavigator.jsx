import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routes } from "../constants";
import { Login } from "../pages";
import StackNavigator from "./StackNavigator";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={routes.LOGIN}>
        <Stack.Screen
          name={routes.MAIN}
          component={StackNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={routes.LOGIN}
          component={Login}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
